export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  prefecture: string;
  island: string;
  bedrooms?: number | null;
  area?: number | null;
  lat: number;
  lng: number;
  imageUrl: string;
  featured: boolean;
  available: boolean;
  builtYear?: string | null;
  needs?: string | null;
  listedAgo?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  island: string;
  price?: number | null;
  currency: string;
  category: string;
  featured: boolean;
  imageUrl?: string | null;
  volunteerCount?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}
