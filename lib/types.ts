export type RiskLevel = "conservative" | "moderate" | "balanced" | "growth" | "aggressive";

export type BasketSlug =
  | "global-growth"
  | "conservative-eur"
  | "usd-wealth-protection"
  | "halal-global"
  | "child-education"
  | "retirement-builder"
  | "dividend-income"
  | "defensive-inflation"
  | "emerging-market-diaspora";

export interface Basket {
  slug: BasketSlug;
  name: string;
  tagline: string;
  description: string;
  targetUser: string;
  goal: string;
  riskLevel: RiskLevel;
  riskScore: number; // 1-5
  timeHorizon: string;
  assetClasses: AssetClass[];
  returnScenario: {
    conservative: number;
    base: number;
    optimistic: number;
  };
  educationalExplanation: string;
  keyRisks: string[];
  suitableFor: string[];
  icon: string;
  color: string;
  highlight?: boolean;
}

export interface AssetClass {
  name: string;
  rangeMin: number;
  rangeMax: number;
  description: string;
}

export interface QuizAnswer {
  country: string;
  currency: string;
  targetCurrency: string;
  monthlyAmount: number;
  lumpSum: number;
  timeHorizon: number;
  riskTolerance: string;
  goal: string;
  isHalal: boolean;
  wantsDiaspora: boolean;
  needsGuidance: boolean;
  diasporaCountry?: string;
}

export interface RiskScore {
  total: number;
  label: RiskLevel;
  components: {
    timeHorizon: number;
    riskTolerance: number;
    investmentAmount: number;
    goal: number;
  };
}

export interface SimulatorInput {
  monthlyAmount: number;
  lumpSum: number;
  years: number;
  annualReturn: number;
  inflationRate: number;
  currency: string;
}

export interface SimulatorResult {
  totalContributions: number;
  futureValue: number;
  totalGain: number;
  inflationAdjustedValue: number;
  yearlyBreakdown: YearlyDataPoint[];
}

export interface YearlyDataPoint {
  year: number;
  contributions: number;
  value: number;
  inflationAdjusted: number;
}
