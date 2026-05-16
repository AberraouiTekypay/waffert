import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, currency, monthlyAmount, isHalal, interestedIn } = body;

    if (!name || !email || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Persist to Supabase when connected
    // const supabase = await createClient();
    // await supabase.from("waitlist_entries").insert({
    //   name, email, country, currency, monthly_amount: monthlyAmount,
    //   is_halal: isHalal, interested_in: interestedIn,
    // });

    console.log("[Waitlist]", { name, email, country, currency, monthlyAmount, isHalal, interestedIn });

    // TODO: Send welcome email via Resend
    // await resend.emails.send({ to: email, subject: "Welcome to Waffert", ... });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
