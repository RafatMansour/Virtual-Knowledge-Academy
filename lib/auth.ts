import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { jwtVerify } from 'jose'

export const accessTokenTtlSeconds = 60 * 60 * 4
export const refreshTokenTtlSeconds = 60 * 60 * 24 * 30

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

// If secrets are missing, we avoid console noise and let runtime throws happen

export const SignupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().min(5),
  username: z.string().min(3),
  password: z.string().min(6),
})

export const LoginSchema = z.object({
  usernameOrEmail: z.string().min(1),
  password: z.string().min(1),
})

export type JwtUserPayload = {
  sub: string
  role: 'student' | 'instructor' | 'admin'
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plain, salt)
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed)
}

export function signTokens(userId: string, role: JwtUserPayload['role']) {
  if (!jwtAccessSecret || !jwtRefreshSecret) throw new Error('JWT secrets not configured')
  const access = jwt.sign({ sub: userId, role }, jwtAccessSecret, { expiresIn: accessTokenTtlSeconds })
  const refresh = jwt.sign({ sub: userId, role }, jwtRefreshSecret, { expiresIn: refreshTokenTtlSeconds })
  return { access, refresh, accessTokenTtlSeconds, refreshTokenTtlSeconds }
}

export function verifyAccessToken(token: string): JwtUserPayload {
  if (!jwtAccessSecret) throw new Error('JWT_ACCESS_SECRET not configured')
  return jwt.verify(token, jwtAccessSecret) as JwtUserPayload
}

export function verifyRefreshToken(token: string): JwtUserPayload {
  if (!jwtRefreshSecret) throw new Error('JWT_REFRESH_SECRET not configured')
  return jwt.verify(token, jwtRefreshSecret) as JwtUserPayload
}

export async function verifyAccessTokenEdge(token: string): Promise<JwtUserPayload> {
  if (!jwtAccessSecret) throw new Error('JWT_ACCESS_SECRET not configured')
  const secret = new TextEncoder().encode(jwtAccessSecret)
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as JwtUserPayload
}

