import { SimulatorInput, SimulatorResult, YearlyDataPoint } from "./types";

/**
 * Educational investment simulator.
 * Uses standard compound interest formula with monthly contributions.
 * Outputs are illustrative only — not guaranteed returns.
 */
export function runSimulator(input: SimulatorInput): SimulatorResult {
  const { monthlyAmount, lumpSum, years, annualReturn, inflationRate } = input;

  const monthlyRate = annualReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const months = years * 12;

  const yearlyBreakdown: YearlyDataPoint[] = [];

  let value = lumpSum;
  let inflationAdjusted = lumpSum;
  let totalContributions = lumpSum;

  for (let year = 1; year <= years; year++) {
    for (let m = 1; m <= 12; m++) {
      value = value * (1 + monthlyRate) + monthlyAmount;
      inflationAdjusted = inflationAdjusted * (1 + monthlyRate - monthlyInflation) + monthlyAmount;
      totalContributions += monthlyAmount;
    }
    yearlyBreakdown.push({
      year,
      contributions: totalContributions,
      value: Math.round(value),
      inflationAdjusted: Math.round(inflationAdjusted),
    });
  }

  const futureValue = Math.round(value);
  const totalGain = Math.round(futureValue - totalContributions);

  return {
    totalContributions: Math.round(totalContributions),
    futureValue,
    totalGain,
    inflationAdjustedValue: Math.round(inflationAdjusted),
    yearlyBreakdown,
  };
}

export const RETURN_PRESETS: Record<string, { conservative: number; base: number; optimistic: number }> = {
  "global-growth": { conservative: 4.5, base: 7.5, optimistic: 11.0 },
  "conservative-eur": { conservative: 1.5, base: 3.0, optimistic: 4.5 },
  "usd-wealth-protection": { conservative: 3.0, base: 5.5, optimistic: 8.0 },
  "halal-global": { conservative: 4.0, base: 6.5, optimistic: 9.5 },
  "child-education": { conservative: 3.5, base: 5.5, optimistic: 8.0 },
  "retirement-builder": { conservative: 4.5, base: 7.0, optimistic: 10.0 },
  "dividend-income": { conservative: 3.0, base: 5.0, optimistic: 7.5 },
  "defensive-inflation": { conservative: 2.0, base: 4.0, optimistic: 6.5 },
  "emerging-market-diaspora": { conservative: 4.0, base: 8.0, optimistic: 14.0 },
  default: { conservative: 3.0, base: 6.0, optimistic: 9.0 },
};
