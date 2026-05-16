import { Basket } from "./types";

export const BASKETS: Basket[] = [
  {
    slug: "global-growth",
    name: "Global Growth Basket",
    tagline: "Long-term wealth through global equity exposure",
    description:
      "A diversified basket designed for long-term capital growth through exposure to global equity markets. Suitable for investors comfortable with market volatility in pursuit of higher long-term returns.",
    targetUser: "Long-term investors aged 25–45 with a growth mindset",
    goal: "Capital growth over 10+ years",
    riskLevel: "growth",
    riskScore: 4,
    timeHorizon: "10+ years",
    assetClasses: [
      { name: "Global Equities", rangeMin: 60, rangeMax: 80, description: "Broad exposure to developed market stocks" },
      { name: "Emerging Market Equities", rangeMin: 10, rangeMax: 20, description: "Growth from developing economies" },
      { name: "Bonds & Fixed Income", rangeMin: 5, rangeMax: 15, description: "Stability buffer" },
      { name: "Cash & Equivalents", rangeMin: 2, rangeMax: 5, description: "Liquidity reserve" },
    ],
    returnScenario: { conservative: 4.5, base: 7.5, optimistic: 11.0 },
    educationalExplanation:
      "Global equity markets have historically delivered strong long-term returns, though with periods of significant volatility. By spreading investments across geographies, this basket aims to capture global growth while reducing concentration risk. This is an educational illustration — past performance does not guarantee future results.",
    keyRisks: [
      "Market volatility — values can fall significantly in the short term",
      "Currency risk — international investments involve exchange rate changes",
      "No guaranteed return — you may get back less than you invest",
      "Liquidity risk — markets may be harder to exit during stress periods",
    ],
    suitableFor: ["Young professionals", "Long-term savers", "Monthly investors building wealth"],
    icon: "🌍",
    color: "#0f2744",
    highlight: true,
  },
  {
    slug: "conservative-eur",
    name: "Conservative EUR Basket",
    tagline: "Steady preservation in euros with modest growth",
    description:
      "Designed for euro-based investors who prioritise capital preservation over growth. Lower risk profile with a blend of bonds, cash instruments, and limited equity exposure.",
    targetUser: "Conservative investors or those approaching a financial goal",
    goal: "Capital preservation with modest growth",
    riskLevel: "conservative",
    riskScore: 2,
    timeHorizon: "3–7 years",
    assetClasses: [
      { name: "EUR Government Bonds", rangeMin: 40, rangeMax: 60, description: "Core European bond exposure" },
      { name: "EUR Corporate Bonds", rangeMin: 15, rangeMax: 25, description: "Investment-grade corporate debt" },
      { name: "Cash & Money Market", rangeMin: 10, rangeMax: 20, description: "Liquid, low-risk instruments" },
      { name: "Global Equities", rangeMin: 5, rangeMax: 15, description: "Small growth component" },
    ],
    returnScenario: { conservative: 1.5, base: 3.0, optimistic: 4.5 },
    educationalExplanation:
      "This basket prioritises stability. Bond-heavy portfolios tend to be less volatile than equity-heavy ones, but offer lower growth potential. EUR-denominated assets reduce currency risk for eurozone residents. This is educational and illustrative only.",
    keyRisks: [
      "Inflation risk — low returns may not keep pace with inflation",
      "Interest rate risk — bond values fall when rates rise",
      "Lower growth potential vs equity-heavy baskets",
      "No guaranteed return",
    ],
    suitableFor: ["Near-term goal savers", "Risk-averse investors", "Retirees or those close to retirement"],
    icon: "🛡️",
    color: "#1e3a8a",
  },
  {
    slug: "usd-wealth-protection",
    name: "USD Wealth Protection Basket",
    tagline: "Preserve wealth in the world's reserve currency",
    description:
      "For investors who earn or wish to hold wealth in USD. Combines dollar-denominated bonds, equities, and cash equivalents to preserve and grow USD-denominated wealth.",
    targetUser: "International professionals, expats, and diaspora investors preferring USD holdings",
    goal: "USD wealth preservation with growth",
    riskLevel: "moderate",
    riskScore: 3,
    timeHorizon: "5–10 years",
    assetClasses: [
      { name: "US Treasury Bonds", rangeMin: 25, rangeMax: 40, description: "US government debt instruments" },
      { name: "US Equities", rangeMin: 30, rangeMax: 45, description: "Large-cap US company exposure" },
      { name: "Global Equities (USD)", rangeMin: 10, rangeMax: 20, description: "International stocks in USD" },
      { name: "USD Cash & Money Market", rangeMin: 5, rangeMax: 15, description: "USD liquidity buffer" },
    ],
    returnScenario: { conservative: 3.0, base: 5.5, optimistic: 8.0 },
    educationalExplanation:
      "Holding assets denominated in USD can provide protection against local currency depreciation, which is important for investors in economies with currency volatility. This is an educational illustration only — currency movements can work against you as well as for you.",
    keyRisks: [
      "Currency risk vs local currency",
      "US market concentration risk",
      "Interest rate sensitivity",
      "Geopolitical risk affecting USD assets",
    ],
    suitableFor: ["Expats", "Diaspora investors", "Those protecting against local currency risk"],
    icon: "💵",
    color: "#166534",
  },
  {
    slug: "halal-global",
    name: "Halal Global Basket",
    tagline: "Global growth, Shariah-compliant principles",
    description:
      "An illustrative basket modelled on Shariah-compliant investing principles. Excludes interest-bearing instruments, alcohol, tobacco, conventional financial services, and other prohibited sectors. Concept includes equities screened for halal compliance and sukuk instruments.",
    targetUser: "Muslim investors seeking halal-compliant wealth building",
    goal: "Shariah-compliant global wealth growth",
    riskLevel: "balanced",
    riskScore: 3,
    timeHorizon: "7–15 years",
    assetClasses: [
      { name: "Halal Global Equities", rangeMin: 55, rangeMax: 70, description: "Shariah-screened global stocks" },
      { name: "Sukuk (Islamic Bonds)", rangeMin: 15, rangeMax: 25, description: "Islamic fixed income instruments" },
      { name: "Halal REITs", rangeMin: 5, rangeMax: 10, description: "Shariah-compliant real estate exposure" },
      { name: "Shariah-compliant Cash", rangeMin: 5, rangeMax: 10, description: "Murabaha/commodity deposits" },
    ],
    returnScenario: { conservative: 4.0, base: 6.5, optimistic: 9.5 },
    educationalExplanation:
      "Shariah-compliant investing screens out companies involved in prohibited activities and avoids interest (riba). Sukuk are Islamic finance instruments that generate returns through asset ownership rather than interest payments. This is an educational concept illustration — Shariah certification requires qualified Islamic scholars and is subject to legal and religious review.",
    keyRisks: [
      "Smaller investable universe may affect diversification",
      "Shariah classification can vary between scholars",
      "Currency and market risk apply as with conventional investing",
      "No guaranteed return",
    ],
    suitableFor: ["Muslim investors", "Ethical investors", "Those seeking values-aligned investing"],
    icon: "☪️",
    color: "#065f46",
    highlight: true,
  },
  {
    slug: "child-education",
    name: "Child Education Basket",
    tagline: "Building your child's educational future",
    description:
      "A medium-term basket concept designed around saving for a child's education costs. Balanced approach that seeks growth in earlier years and gradually de-risks as the target date approaches.",
    targetUser: "Parents saving for a child aged 0–15",
    goal: "Fund education costs in 5–18 years",
    riskLevel: "balanced",
    riskScore: 3,
    timeHorizon: "5–18 years",
    assetClasses: [
      { name: "Global Equities", rangeMin: 40, rangeMax: 60, description: "Growth engine for longer horizons" },
      { name: "Bonds", rangeMin: 20, rangeMax: 35, description: "Stability as target date approaches" },
      { name: "Cash & Short-term Instruments", rangeMin: 10, rangeMax: 20, description: "Liquidity near withdrawal date" },
      { name: "Property/Real Assets", rangeMin: 5, rangeMax: 10, description: "Inflation protection" },
    ],
    returnScenario: { conservative: 3.5, base: 5.5, optimistic: 8.0 },
    educationalExplanation:
      "Education savings benefit from a 'glide path' approach — higher risk when the timeline is long, gradually becoming more conservative as the education start date approaches. Regular monthly contributions help smooth out market volatility through pound/euro-cost averaging. This is an educational illustration only.",
    keyRisks: [
      "Education costs may rise faster than investment returns",
      "Market downturns close to the target date can reduce final value",
      "Currency risk if educating abroad",
      "No guaranteed return",
    ],
    suitableFor: ["Parents", "Grandparents saving for family", "Those with a defined future education goal"],
    icon: "🎓",
    color: "#7c3aed",
  },
  {
    slug: "retirement-builder",
    name: "Retirement Builder Basket",
    tagline: "Building the wealth for a comfortable retirement",
    description:
      "A long-term basket concept designed to accumulate wealth for retirement. Higher growth orientation in earlier years with a conceptual glide path toward income-generating assets as retirement approaches.",
    targetUser: "Working professionals planning for retirement in 10–30 years",
    goal: "Retirement income and wealth accumulation",
    riskLevel: "growth",
    riskScore: 4,
    timeHorizon: "10–30 years",
    assetClasses: [
      { name: "Global Equities", rangeMin: 50, rangeMax: 70, description: "Long-term growth engine" },
      { name: "Dividend Equities", rangeMin: 10, rangeMax: 20, description: "Income component" },
      { name: "Bonds", rangeMin: 10, rangeMax: 20, description: "Stability and income" },
      { name: "Real Assets / Property", rangeMin: 5, rangeMax: 15, description: "Inflation hedge" },
    ],
    returnScenario: { conservative: 4.5, base: 7.0, optimistic: 10.0 },
    educationalExplanation:
      "Long investment horizons are one of the most powerful advantages available to investors — time allows compounding to work. Regular monthly contributions, combined with reinvested growth, can build significant wealth over decades. This is an educational illustration only and does not constitute a pension product or regulated advice.",
    keyRisks: [
      "Long-term market uncertainty",
      "Inflation eroding purchasing power of future savings",
      "Life changes may affect ability to contribute consistently",
      "Regulatory and tax treatment of retirement savings varies by country",
    ],
    suitableFor: ["Young and mid-career professionals", "Long-term monthly investors", "Those without access to occupational pensions"],
    icon: "🌅",
    color: "#0f2744",
    highlight: true,
  },
  {
    slug: "dividend-income",
    name: "Dividend Income Basket",
    tagline: "Regular income from global dividend-paying companies",
    description:
      "An income-focused basket concept targeting companies and instruments known for regular dividend distributions. Suitable for those who want their investments to generate ongoing income rather than pure capital growth.",
    targetUser: "Income-seeking investors wanting cash flow from their portfolio",
    goal: "Regular income with capital preservation",
    riskLevel: "moderate",
    riskScore: 3,
    timeHorizon: "5–15 years",
    assetClasses: [
      { name: "Global Dividend Equities", rangeMin: 50, rangeMax: 65, description: "High-dividend paying stocks" },
      { name: "Real Estate (REITs)", rangeMin: 10, rangeMax: 20, description: "Property income exposure" },
      { name: "Infrastructure", rangeMin: 5, rangeMax: 15, description: "Stable long-term income" },
      { name: "Bonds", rangeMin: 10, rangeMax: 20, description: "Fixed income component" },
    ],
    returnScenario: { conservative: 3.0, base: 5.0, optimistic: 7.5 },
    educationalExplanation:
      "Dividend investing focuses on companies with a history of sharing profits with shareholders. While dividend yield can provide regular cash flow, dividends can be cut during economic downturns. REITs and infrastructure can add diversification and stable income streams. This is an educational illustration only.",
    keyRisks: [
      "Dividends are not guaranteed and can be reduced or cut",
      "High-yield stocks can signal financial stress",
      "Currency risk on international dividends",
      "Tax treatment of dividends varies by country",
    ],
    suitableFor: ["Income-seeking investors", "Those nearing or in retirement", "Investors wanting reinvestment options"],
    icon: "💰",
    color: "#b45309",
  },
  {
    slug: "defensive-inflation",
    name: "Defensive Inflation Protection Basket",
    tagline: "Protect your wealth against the erosion of inflation",
    description:
      "A defensive basket concept focused on assets that have historically performed well during inflationary periods. Combines inflation-linked bonds, real assets, and commodities to help preserve purchasing power.",
    targetUser: "Conservative investors concerned about inflation eroding savings",
    goal: "Real purchasing power preservation",
    riskLevel: "conservative",
    riskScore: 2,
    timeHorizon: "3–10 years",
    assetClasses: [
      { name: "Inflation-Linked Bonds", rangeMin: 30, rangeMax: 45, description: "Returns linked to inflation indices" },
      { name: "Real Estate (REITs)", rangeMin: 15, rangeMax: 25, description: "Property as inflation hedge" },
      { name: "Commodities / Gold", rangeMin: 10, rangeMax: 20, description: "Traditional inflation hedge" },
      { name: "Dividend Equities", rangeMin: 15, rangeMax: 25, description: "Companies that can pass on price rises" },
    ],
    returnScenario: { conservative: 2.0, base: 4.0, optimistic: 6.5 },
    educationalExplanation:
      "Inflation silently erodes the value of cash savings over time. Assets with intrinsic value — property, commodities, inflation-linked bonds — have historically provided some protection. This is an educational illustration and does not guarantee inflation protection. Gold and commodities can be highly volatile.",
    keyRisks: [
      "Commodity prices are highly volatile",
      "Inflation-linked bonds still lose value if sold before maturity in rising rate environments",
      "Real estate illiquidity",
      "No guaranteed protection against inflation",
    ],
    suitableFor: ["Cash-heavy investors", "Those in high-inflation environments", "Conservative investors focused on preservation"],
    icon: "⚖️",
    color: "#374151",
  },
  {
    slug: "emerging-market-diaspora",
    name: "Emerging Market Diaspora Basket",
    tagline: "Capture growth from your home region and beyond",
    description:
      "Designed for diaspora investors who want to participate in the growth of emerging markets while maintaining developed market stability. Balances exposure to Africa, MENA, Asia, and Latin America with global blue-chip anchors.",
    targetUser: "Diaspora investors wanting emerging market exposure alongside global stability",
    goal: "Emerging market growth with developed market diversification",
    riskLevel: "aggressive",
    riskScore: 5,
    timeHorizon: "10–20 years",
    assetClasses: [
      { name: "Emerging Market Equities", rangeMin: 35, rangeMax: 55, description: "Africa, MENA, Asia, LatAm exposure" },
      { name: "Global Developed Equities", rangeMin: 25, rangeMax: 40, description: "Stability anchor" },
      { name: "Emerging Market Bonds", rangeMin: 10, rangeMax: 20, description: "EM fixed income exposure" },
      { name: "Cash & Alternatives", rangeMin: 5, rangeMax: 10, description: "Liquidity and diversification" },
    ],
    returnScenario: { conservative: 4.0, base: 8.0, optimistic: 14.0 },
    educationalExplanation:
      "Emerging markets offer significant growth potential as economies develop, but come with higher volatility, political risk, currency risk, and liquidity risk than developed markets. For diaspora investors, there may be an informational edge in understanding home-region dynamics. This is an educational illustration — emerging market investing carries substantial risk.",
    keyRisks: [
      "Significantly higher volatility than developed markets",
      "Political and regulatory risk",
      "Currency risk is amplified",
      "Liquidity risk — some markets are harder to exit",
      "Economic and governance uncertainty",
    ],
    suitableFor: ["Diaspora investors", "Risk-tolerant long-term investors", "Those with knowledge of emerging market dynamics"],
    icon: "🌱",
    color: "#065f46",
    highlight: true,
  },
];

import { LAUNCH_CONFIG } from "./config";

/** Baskets visible to the public in the current launch phase */
export const LAUNCH_BASKETS = BASKETS.filter((b) =>
  LAUNCH_CONFIG.LAUNCH_BASKET_SLUGS.includes(b.slug)
);

export function getBasketBySlug(slug: string): Basket | undefined {
  return BASKETS.find((b) => b.slug === slug);
}

export function getLaunchBasketBySlug(slug: string): Basket | undefined {
  return LAUNCH_BASKETS.find((b) => b.slug === slug);
}

export function getRiskLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    conservative: "Conservative",
    moderate: "Moderate",
    balanced: "Balanced",
    growth: "Growth",
    aggressive: "Aggressive",
  };
  return labels[level] || level;
}
