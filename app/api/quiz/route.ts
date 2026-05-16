import { NextRequest, NextResponse } from "next/server";
import { computeRiskScore, recommendBaskets } from "@/lib/recommendation-engine";
import { QuizAnswer } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const answers: QuizAnswer = await req.json();

    // Compute risk score and basket recommendation
    const riskScore = computeRiskScore(answers);
    const recommendation = recommendBaskets(answers, riskScore);

    const result = {
      id: crypto.randomUUID(),
      answers,
      riskScore,
      recommendation,
      createdAt: new Date().toISOString(),
    };

    // TODO: Persist to Supabase when connected
    // const supabase = await createClient();
    // await supabase.from("quiz_responses").insert({ ... });

    // Store in cookie/session for result page
    const response = NextResponse.json(result, { status: 200 });

    // Set a short-lived cookie with the result
    response.cookies.set("waffert_quiz_result", JSON.stringify(result), {
      maxAge: 60 * 60, // 1 hour
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Failed to process quiz" },
      { status: 500 }
    );
  }
}
