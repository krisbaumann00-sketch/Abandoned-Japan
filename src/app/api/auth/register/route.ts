import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, password: hash },
    });

    // Send welcome email (non-blocking — don't fail registration if email fails)
    sendWelcomeEmail(data.email, data.name).catch((err) =>
      console.error("Welcome email failed:", err)
    );

    return NextResponse.json(
      { message: "Account created successfully!", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid registration data." }, { status: 400 });
    }
    return NextResponse.json({ message: "Registration failed. Please try again." }, { status: 500 });
  }
}
