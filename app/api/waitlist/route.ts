import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, currency, monthlyAmount, isHalal, interestedIn } = body;

    if (!name || !email || !country) {
      return NextResponse.json({ error: "Name, email and country are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Upsert — prevent duplicate emails from causing 500s
    const { error: dbError } = await supabase
      .from("waitlist_entries")
      .upsert(
        {
          name,
          email,
          country,
          currency: currency || null,
          monthly_amount: monthlyAmount || null,
          is_halal: isHalal ?? false,
          interested_in: interestedIn ?? [],
          source: "website",
        },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (dbError) {
      console.error("[Waitlist] Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to register" }, { status: 500 });
    }

    // Log compliance consent
    await supabase.from("compliance_consents").insert({
      email,
      consent_type: "waitlist_marketing",
      user_agent: req.headers.get("user-agent") || "",
      consented: true,
    });

    // TODO Sprint 2: send welcome email via Resend

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
