import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Simple bearer-token auth using the admin password env var
function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  return token === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "waffert2026");
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createClient();

    const [waitlistRes, quizRes, consultationRes] = await Promise.all([
      supabase.from("waitlist_entries").select("id, country, currency, monthly_amount, is_halal, created_at", { count: "exact" }),
      supabase.from("quiz_responses").select("id, country, primary_basket, is_halal, monthly_amount, created_at", { count: "exact" }),
      supabase.from("consultation_requests").select("id, country, status, created_at", { count: "exact" }),
    ]);

    const waitlist = waitlistRes.data ?? [];
    const quiz = quizRes.data ?? [];
    const consultations = consultationRes.data ?? [];

    // Aggregate country distribution
    const countryCount: Record<string, number> = {};
    waitlist.forEach((r) => {
      if (r.country) countryCount[r.country] = (countryCount[r.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    // Basket distribution
    const basketCount: Record<string, number> = {};
    quiz.forEach((r) => {
      if (r.primary_basket) basketCount[r.primary_basket] = (basketCount[r.primary_basket] || 0) + 1;
    });
    const topBaskets = Object.entries(basketCount)
      .sort((a, b) => b[1] - a[1])
      .map(([slug, count]) => ({ slug, count }));

    // Monthly amount distribution
    const monthlyCount: Record<string, number> = {};
    waitlist.forEach((r) => {
      if (r.monthly_amount) monthlyCount[r.monthly_amount] = (monthlyCount[r.monthly_amount] || 0) + 1;
    });

    // Halal %
    const halalCount = waitlist.filter((r) => r.is_halal).length;
    const halalPct = waitlist.length > 0 ? Math.round((halalCount / waitlist.length) * 100) : 0;

    // Recent waitlist entries
    const recentLeads = await supabase
      .from("waitlist_entries")
      .select("name, email, country, currency, monthly_amount, is_halal, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    return NextResponse.json({
      waitlistTotal: waitlistRes.count ?? waitlist.length,
      quizTotal: quizRes.count ?? quiz.length,
      consultationTotal: consultationRes.count ?? consultations.length,
      halalPct,
      topCountries,
      topBaskets,
      monthlyDistribution: Object.entries(monthlyCount)
        .sort((a, b) => b[1] - a[1])
        .map(([range, count]) => ({ range, count })),
      recentLeads: recentLeads.data ?? [],
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
