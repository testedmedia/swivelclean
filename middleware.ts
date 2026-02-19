import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ── Referrer dashboard auth (JWT-based, separate from admin) ──
  if (pathname.startsWith('/referrer') && pathname !== '/referrer/login') {
    const sessionCookie = request.cookies.get('referrer_session')?.value
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/referrer/login', request.url))
    }
    // JWT verification happens in the API routes — middleware just checks cookie existence
    return NextResponse.next()
  }

  // ── Admin auth (Supabase) ──
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isLoginPage = pathname === '/admin/login'

  if (!user && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (user && isLoginPage) {
    const bookingsUrl = new URL('/admin/bookings', request.url)
    return NextResponse.redirect(bookingsUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/referrer/:path*'],
}
