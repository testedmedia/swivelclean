// Shared constants — safe to import from both client and server components
export const COMMISSIONS: Record<string, number> = {
  standard: 25,
  premium: 25,
  deep: 50,
}

export const SIGNUP_BONUS = 25
export const PAYOUT_THRESHOLD = 50
export const COOKIE_DAYS = 90
export const REF_COOKIE_NAME = 'ref_code'
export const SESSION_COOKIE_NAME = 'referrer_session'
export const SESSION_DAYS = 30
export const OTP_EXPIRY_MINUTES = 10
