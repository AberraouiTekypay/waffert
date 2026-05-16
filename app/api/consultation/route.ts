import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, message, preferredTime, monthlyAmount, phone } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error: dbError } = await supabase.from("consultation_requests").insert({
      name,
      email,
      phone: phone || null,
      country: country || null,
      monthly_amount: monthlyAmount || null,
      preferred_time: preferredTime || null,
      message: message || null,
      status: "pending",
    });

    if (dbError) {
      console.error("[Consultation] Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
    }

    // Log compliance consent
    await supabase.from("compliance_consents").insert({
      email,
      consent_type: "consultation_disclaimer",
      user_agent: req.headers.get("user-agent") || "",
      consented: true,
    });

    // TODO Sprint 2: send notification email to team via Resend

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ error: "Failed to submit consultation request" }, { status: 500 });
  }
}
