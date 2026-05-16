import { NextRequest, NextResponse } from "next/server";
import { computeRiskScore, recommendBaskets } from "@/lib/recommendation-engine";
import { QuizAnswer } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { resend, FROM_EMAIL, TEAM_EMAIL, isEmailEnabled } from "@/lib/resend";
import { TeamNotificationEmail } from "@/emails/team-notification";
import { render } from "@react-email/render";
import { getBasketBySlug } from "@/lib/baskets";

export async function POST(req: NextRequest) {
  try {
    const answers: QuizAnswer = await req.json();

    const riskScore = computeRiskScore(answers);
    const recommendation = recommendBaskets(answers, riskScore);

    const result = {
      id: crypto.randomUUID(),
      answers,
      riskScore,
      recommendation,
      createdAt: new Date().toISOString(),
    };

    // Persist to Supabase
    try {
      const supabase = await createClient();
      await supabase.from("quiz_responses").insert({
        session_id: result.id,
        country: answers.country,
        currency: answers.currency,
        target_currency: answers.targetCurrency,
        monthly_amount: answers.monthlyAmount,
        lump_sum: answers.lumpSum,
        time_horizon: answers.timeHorizon,
        risk_tolerance: answers.riskTolerance,
        goal: answers.goal,
        is_halal: answers.isHalal,
        wants_diaspora: answers.wantsDiaspora,
        needs_guidance: answers.needsGuidance,
        risk_score: riskScore.total,
        risk_label: riskScore.label,
        primary_basket: recommendation.primary,
        alternative_baskets: recommendation.alternatives,
      });

      // Log compliance consent
      await supabase.from("compliance_consents").insert({
        session_id: result.id,
        consent_type: "quiz_educational",
        user_agent: req.headers.get("user-agent") || "",
        consented: true,
      });
    } catch (dbErr) {
      console.error("[Quiz] Supabase insert failed:", dbErr);
    }

    // Alert team for high-intent leads (wants guidance)
    if (answers.needsGuidance && isEmailEnabled() && resend) {
      const basketName = getBasketBySlug(recommendation.primary)?.name;
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: TEAM_EMAIL,
          subject: `🔥 High-intent quiz lead wants guidance (${answers.country})`,
          html: await render(
            TeamNotificationEmail({
              type: "quiz",
              name: "Quiz user",
              email: "—",
              country: answers.country,
              currency: answers.currency,
              monthlyAmount: String(answers.monthlyAmount),
              isHalal: answers.isHalal,
              primaryBasket: basketName,
            })
          ),
        });
      } catch (emailErr) {
        console.error("[Quiz] Team alert email failed (non-fatal):", emailErr);
      }
    }

    const response = NextResponse.json(result, { status: 200 });
    response.cookies.set("waffert_quiz_result", JSON.stringify(result), {
      maxAge: 60 * 60,
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json({ error: "Failed to process quiz" }, { status: 500 });
  }
}
