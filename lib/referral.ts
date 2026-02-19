import { SignJWT, jwtVerify } from 'jose'

// Re-export constants so existing imports don't break
export {
  COMMISSIONS,
  PAYOUT_THRESHOLD,
  COOKIE_DAYS,
  REF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_DAYS,
  OTP_EXPIRY_MINUTES,
} from './referral-constants'

// ── Code Generator ──
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'RR-'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// ── OTP ──
export function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function hashOTP(otp: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(otp)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// ── JWT Helpers ──
function getJWTSecret() {
  const secret = process.env.REFERRER_JWT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!secret) throw new Error('No JWT secret configured')
  return new TextEncoder().encode(secret)
}

export async function signReferrerToken(payload: { referrerId: string; email: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${30}d`)
    .setIssuedAt()
    .sign(getJWTSecret())
}

export async function verifyReferrerToken(token: string): Promise<{ referrerId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getJWTSecret())
    return payload as unknown as { referrerId: string; email: string }
  } catch {
    return null
  }
}
