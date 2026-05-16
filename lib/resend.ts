import { Resend } from "resend";

// Resend client — gracefully handles missing API key (dev/early-access mode)
const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@waffert.com";
export const TEAM_EMAIL = process.env.TEAM_EMAIL || "team@waffert.com";

export function isEmailEnabled(): boolean {
  return !!resendApiKey;
}
