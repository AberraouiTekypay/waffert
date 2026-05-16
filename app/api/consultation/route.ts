import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, message, preferredTime, monthlyAmount } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // TODO: Persist to Supabase when connected
    // TODO: Send notification email to team via Resend
    // TODO: Create Calendly booking or send calendar invite

    console.log("[Consultation Request]", { name, email, country, message, preferredTime, monthlyAmount });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ error: "Failed to submit consultation request" }, { status: 500 });
  }
}
