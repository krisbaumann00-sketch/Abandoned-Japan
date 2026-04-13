import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendStoryConfirmation, sendStoryAdminNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  island: z.string().max(100).optional().default(""),
  story: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Send emails (non-blocking)
    sendStoryConfirmation(data.email, data.name).catch((err) =>
      console.error("Story confirmation email failed:", err)
    );
    sendStoryAdminNotification({
      name: data.name,
      email: data.email,
      island: data.island,
      story: data.story,
    }).catch((err) => console.error("Story admin notification failed:", err));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Invalid submission." }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Submission failed." }, { status: 500 });
  }
}
