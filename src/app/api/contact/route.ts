import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendContactConfirmation, sendContactAdminNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message,
      },
    });

    // Send emails (non-blocking)
    sendContactConfirmation(data.email, data.name, data.message).catch((err) =>
      console.error("Contact confirmation email failed:", err)
    );
    sendContactAdminNotification({
      name: data.name,
      email: data.email,
      interest: data.interest,
      message: data.message,
    }).catch((err) => console.error("Contact admin notification failed:", err));

    return NextResponse.json(
      { success: true, message: "Thank you! We'll be in touch within 48 hours." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
