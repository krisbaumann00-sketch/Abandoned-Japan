/**
 * Akiya Scraper Import Script
 *
 * Reads images from ~/Desktop/Akiya Bank Listings/Home-Images/<Prefecture>/
 * (output of akiya_scraper.py) and creates/updates Property records in the DB.
 *
 * Usage: npm run akiya:import
 */
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const prisma = new PrismaClient();

const SCRAPER_OUTPUT = path.join(os.homedir(), "Desktop", "Akiya Bank Listings", "Home-Images");
const PUBLIC_SCRAPED = path.join(__dirname, "../public/scraped-images");

// Prefecture → island name mappings
const PREF_ISLANDS: Record<string, string> = {
  "Kagawa":     "Naoshima",
  "Hiroshima":  "Ōkunoshima",
  "Okayama":    "Kasaoka Islands",
  "Nagasaki":   "Goto Islands",
  "Okinawa":    "Okinawa Main Island",
  "Kumamoto":   "Amakusa Islands",
  "Yamaguchi":  "Suō-Ōshima",
  "Tokyo":      "Izu Ōshima",
  "Kyoto":      "Kyoto",
  "Osaka":      "Osaka",
  "Hokkaido":   "Rebun Island",
};

interface ScrapedProperty {
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  prefecture: string;
  island: string;
  lat: number;
  lng: number;
  imageUrl: string;
  featured: boolean;
  available: boolean;
  builtYear: string;
  needs: string | null;
  listedAgo: string;
}

function generatePropertyFromImage(
  imagePath: string,
  prefecture: string,
  index: number
): ScrapedProperty {
  const island = PREF_ISLANDS[prefecture] || prefecture;
  const types = ["house", "house", "house", "commercial", "studio"];
  const needsList = ["Roof repair", "Window repair", "Interior refresh", "Full restoration", null, null];
  const prices = [2400, 3200, 3800, 4800, 5500, 6500];
  const years = ["1932", "1945", "1955", "1963", "1971", "1938"];

  const i = index % 6;
  return {
    title: `Akiya #${String(index + 1).padStart(3, "0")} — ${island}`,
    description: `Authentic abandoned property sourced from Akiya Bank listings in ${prefecture}. A rare opportunity to restore a piece of Japan's island heritage.`,
    price: prices[i],
    type: types[i % types.length],
    location: `${island}, ${prefecture}`,
    prefecture,
    island,
    lat: 34.0 + (Math.random() * 4 - 2),
    lng: 133.0 + (Math.random() * 4 - 2),
    imageUrl: `/scraped-images/${prefecture}/${path.basename(imagePath)}`,
    featured: index < 3,
    available: true,
    builtYear: years[i],
    needs: needsList[i % needsList.length],
    listedAgo: `${index + 1} days ago`,
  };
}

async function main() {
  console.log("=".repeat(60));
  console.log("  Akiya Scraper → Database Import");
  console.log("=".repeat(60));

  if (!fs.existsSync(SCRAPER_OUTPUT)) {
    console.log(`\n[INFO] Scraper output not found at:\n  ${SCRAPER_OUTPUT}`);
    console.log("\nRun akiya_scraper.py first to download property images.");
    console.log("Then re-run: npm run akiya:import\n");
    process.exit(0);
  }

  // Ensure public/scraped-images exists
  if (!fs.existsSync(PUBLIC_SCRAPED)) {
    fs.mkdirSync(PUBLIC_SCRAPED, { recursive: true });
  }

  const prefectures = fs.readdirSync(SCRAPER_OUTPUT).filter(
    (d) => fs.statSync(path.join(SCRAPER_OUTPUT, d)).isDirectory()
  );

  console.log(`\nFound ${prefectures.length} prefecture folders: ${prefectures.join(", ")}\n`);

  let total = 0;
  let imported = 0;

  for (const prefecture of prefectures) {
    const prefDir = path.join(SCRAPER_OUTPUT, prefecture);
    const destDir = path.join(PUBLIC_SCRAPED, prefecture);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const images = fs.readdirSync(prefDir).filter(
      (f) => /\.(jpe?g|png|webp)$/i.test(f)
    );

    console.log(`[${prefecture}] ${images.length} images found`);

    for (let i = 0; i < images.length; i++) {
      const imgFile = images[i];
      const src = path.join(prefDir, imgFile);
      const dest = path.join(destDir, imgFile);
      total++;

      // Copy image to public folder so Next.js can serve it
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
      }

      // Check if property already exists for this image
      const imageUrl = `/scraped-images/${prefecture}/${imgFile}`;
      const existing = await prisma.property.findFirst({
        where: { imageUrl },
      });

      if (!existing) {
        const propertyData = generatePropertyFromImage(src, prefecture, i);
        await prisma.property.create({ data: propertyData });
        imported++;
        console.log(`  + Imported: ${propertyData.title}`);
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`  Done! ${total} images processed, ${imported} new properties added.`);
  console.log("=".repeat(60) + "\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
