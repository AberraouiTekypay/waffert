import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { resend, FROM_EMAIL, TEAM_EMAIL, isEmailEnabled } from "@/lib/resend";
import { WelcomeWaitlistEmail } from "@/emails/welcome-waitlist";
import { TeamNotificationEmail } from "@/emails/team-notification";
import { render } from "@react-email/render";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, currency, monthlyAmount, isHalal, interestedIn } = body;

    if (!name || !email || !country) {
      return NextResponse.json({ error: "Name, email and country are required" }, { status: 400 });
    }

    // Persist to Supabase
    const supabase = await createClient();
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

    // Log consent
    await supabase.from("compliance_consents").insert({
      email,
      consent_type: "waitlist_marketing",
      user_agent: req.headers.get("user-agent") || "",
      consented: true,
    });

    // Send emails via Resend (non-blocking, best-effort)
    if (isEmailEnabled() && resend) {
      try {
        await Promise.all([
          // Welcome email to user
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "You're registered for early access to Waffert 🌍",
            html: await render(WelcomeWaitlistEmail({ name, country })),
          }),
          // Team notification
          resend.emails.send({
            from: FROM_EMAIL,
            to: TEAM_EMAIL,
            subject: `New early-access signup: ${name} (${country})`,
            html: await render(
              TeamNotificationEmail({
                type: "waitlist",
                name,
                email,
                country,
                currency,
                monthlyAmount,
                isHalal,
              })
            ),
          }),
        ]);
      } catch (emailErr) {
        console.error("[Waitlist] Email send failed (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
