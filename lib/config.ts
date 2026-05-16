/**
 * Waffert feature flags and launch configuration.
 * Control what is visible to public users vs hidden for later phases.
 */

export const LAUNCH_CONFIG = {
  // Baskets visible in public navigation and quiz results
  LAUNCH_BASKET_SLUGS: [
    "global-growth",
    "conservative-eur",
    "usd-wealth-protection",
    "halal-global",
    "child-education",
  ],

  // Future baskets — kept in codebase, hidden from public for now
  HIDDEN_BASKET_SLUGS: [
    "retirement-builder",
    "dividend-income",
    "defensive-inflation",
    "emerging-market-diaspora",
  ],

  // Feature flags
  SHOW_SIMULATOR: true,
  SHOW_EDUCATION: true,
  SHOW_CONSULTATION: true,
  SHOW_ADMIN: true,

  // Provider mode: "mock" | "paper" | "live"
  PROVIDER_MODE: "mock" as const,

  // Active provider stub (for future API routing)
  ACTIVE_PROVIDER: "mockInvestmentProvider",

  // Platform status
  PLATFORM_STATUS: "early_access" as const,
};

/**
 * Provider abstraction layer stubs.
 * Replace with real implementations when regulated partners are onboarded.
 *
 * TODO Phase 2: wire to Upvest, DriveWealth, Alpaca, or WealthKernel
 */
export const PROVIDERS = {
  mockInvestmentProvider: {
    name: "Mock Provider (Educational)",
    isLive: false,
    canExecute: false,
    canCustody: false,
    description: "Illustrative mock data only. No real trading.",
  },
  alpacaPaperProvider: {
    name: "Alpaca Paper Trading",
    isLive: false,
    canExecute: false, // Paper only
    canCustody: false,
    description: "Future: Alpaca paper trading for beta testing.",
    // TODO: apiKey: process.env.ALPACA_API_KEY,
    // TODO: baseUrl: "https://paper-api.alpaca.markets",
  },
  upvestProvider: {
    name: "Upvest",
    isLive: false,
    canExecute: false, // Pending legal/partner agreement
    canCustody: false,
    description: "Future: European regulated investment execution via Upvest.",
    // TODO: Requires MiFID II regulated partnership agreement
  },
  drivewealthProvider: {
    name: "DriveWealth",
    isLive: false,
    canExecute: false,
    canCustody: false,
    description: "Future: US fractional share investing via DriveWealth.",
  },
} as const;
