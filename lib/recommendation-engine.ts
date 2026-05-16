import { QuizAnswer, RiskScore, RiskLevel, BasketSlug } from "./types";

/**
 * Deterministic, rules-based risk scoring engine.
 * Produces an explainable score — no black-box AI.
 * All outputs are illustrative and educational only.
 */

export function computeRiskScore(answers: QuizAnswer): RiskScore {
  let timeHorizonScore = 0;
  if (answers.timeHorizon <= 2) timeHorizonScore = 1;
  else if (answers.timeHorizon <= 5) timeHorizonScore = 2;
  else if (answers.timeHorizon <= 10) timeHorizonScore = 3;
  else if (answers.timeHorizon <= 20) timeHorizonScore = 4;
  else timeHorizonScore = 5;

  const riskToleranceMap: Record<string, number> = {
    very_low: 1,
    low: 2,
    medium: 3,
    high: 4,
    very_high: 5,
  };
  const riskToleranceScore = riskToleranceMap[answers.riskTolerance] ?? 3;

  let amountScore = 3;
  if (answers.monthlyAmount < 100) amountScore = 2;
  else if (answers.monthlyAmount < 500) amountScore = 3;
  else if (answers.monthlyAmount < 2000) amountScore = 4;
  else amountScore = 5;

  const goalMap: Record<string, number> = {
    preservation: 1,
    income: 2,
    balanced_growth: 3,
    growth: 4,
    aggressive_growth: 5,
    retirement: 4,
    education: 3,
    house: 2,
    emergency: 1,
  };
  const goalScore = goalMap[answers.goal] ?? 3;

  // Weighted average: time horizon 30%, risk tolerance 40%, amount 10%, goal 20%
  const total = Math.round(
    timeHorizonScore * 0.3 +
      riskToleranceScore * 0.4 +
      amountScore * 0.1 +
      goalScore * 0.2
  );

  const clampedTotal = Math.min(5, Math.max(1, total));

  const labels: Record<number, RiskLevel> = {
    1: "conservative",
    2: "conservative",
    3: "balanced",
    4: "growth",
    5: "aggressive",
  };

  return {
    total: clampedTotal,
    label: labels[clampedTotal],
    components: {
      timeHorizon: timeHorizonScore,
      riskTolerance: riskToleranceScore,
      investmentAmount: amountScore,
      goal: goalScore,
    },
  };
}

/**
 * Rules-based basket recommendation.
 * Returns ordered list of basket slugs (primary + alternatives).
 */
export function recommendBaskets(
  answers: QuizAnswer,
  riskScore: RiskScore
): { primary: BasketSlug; alternatives: BasketSlug[] } {
  // Hard rule: halal preference always routes to Halal Global Basket first
  if (answers.isHalal) {
    return {
      primary: "halal-global",
      alternatives: getAlternativesForHalal(riskScore, answers),
    };
  }

  // Goal-based routing
  if (answers.goal === "education") {
    return {
      primary: "child-education",
      alternatives: ["global-growth", "conservative-eur"],
    };
  }

  if (answers.goal === "retirement") {
    // retirement-builder is hidden at launch; fall back to global-growth
    return {
      primary: "global-growth",
      alternatives: ["conservative-eur", "usd-wealth-protection"],
    };
  }

  if (answers.goal === "income") {
    // dividend-income is hidden at launch; fall back to conservative-eur
    return {
      primary: "conservative-eur",
      alternatives: ["usd-wealth-protection", "global-growth"],
    };
  }

  if (answers.goal === "preservation" || answers.goal === "emergency") {
    return {
      primary: "conservative-eur",
      alternatives: ["usd-wealth-protection", "global-growth"],
    };
  }

  // Currency preference routing
  if (answers.targetCurrency === "USD" && riskScore.total >= 2) {
    return {
      primary: "usd-wealth-protection",
      alternatives: getByRisk(riskScore.total),
    };
  }

  // Diaspora routing — emerging-market-diaspora hidden at launch, use global-growth
  if (answers.wantsDiaspora && riskScore.total >= 3) {
    return {
      primary: "global-growth",
      alternatives: ["halal-global", "usd-wealth-protection"],
    };
  }

  // Default risk-based routing
  const primary = getByRisk(riskScore.total)[0];
  const alternatives = getByRisk(riskScore.total).slice(1, 3);

  return { primary, alternatives };
}

// Only uses launch baskets (5 visible baskets)
function getByRisk(score: number): BasketSlug[] {
  if (score === 1) return ["conservative-eur", "usd-wealth-protection", "child-education"];
  if (score === 2) return ["conservative-eur", "usd-wealth-protection", "global-growth"];
  if (score === 3) return ["usd-wealth-protection", "global-growth", "conservative-eur"];
  if (score === 4) return ["global-growth", "usd-wealth-protection", "child-education"];
  return ["global-growth", "halal-global", "usd-wealth-protection"];
}

function getAlternativesForHalal(riskScore: RiskScore, _answers: QuizAnswer): BasketSlug[] {
  if (riskScore.total <= 2) return ["conservative-eur", "usd-wealth-protection"];
  return ["global-growth", "child-education"];
}

export function getRiskLabel(score: number): string {
  const labels: Record<number, string> = {
    1: "Conservative",
    2: "Moderately Conservative",
    3: "Balanced",
    4: "Growth-Oriented",
    5: "Aggressive Growth",
  };
  return labels[score] ?? "Balanced";
}

export function getRiskDescription(score: number): string {
  const descs: Record<number, string> = {
    1: "You prefer to protect what you have, accepting lower returns for greater stability.",
    2: "You lean cautious, comfortable with modest returns and limited volatility.",
    3: "You seek a balance between growth and stability, accepting moderate ups and downs.",
    4: "You're comfortable with market swings in pursuit of stronger long-term returns.",
    5: "You have a high tolerance for risk and seek maximum long-term growth potential.",
  };
  return descs[score] ?? "You seek a balanced approach to investing.";
}
