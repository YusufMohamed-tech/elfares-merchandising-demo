import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
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

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isLoginPage = path.startsWith('/login')
  const isAppRoute   = path.startsWith('/app')
  const isFieldRoute = path.startsWith('/field')
  const isHgRoute    = path.startsWith('/hg')
  const isProtected  = isAppRoute || isFieldRoute || isHgRoute

  // Not logged in → send to login
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Already logged in → redirect away from login based on role
  if (user && isLoginPage) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role
    const url = request.nextUrl.clone()
    url.pathname = role === 'merchandiser'
      ? '/field/today'
      : role === 'platform_admin'
        ? '/hg/dashboard'
        : '/app/dashboard'
    return NextResponse.redirect(url)
  }

  // Logged in — enforce role-based shell access
  if (user && isProtected) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role
    const url = request.nextUrl.clone()

    // Merchandiser trying to access /app or /hg → send to field
    if (role === 'merchandiser' && (isAppRoute || isHgRoute)) {
      url.pathname = '/field/today'
      return NextResponse.redirect(url)
    }

    // Non-platform-admin trying to access /hg → send to workspace
    if (role !== 'platform_admin' && role !== 'merchandiser' && isHgRoute) {
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }

    // Workspace user (admin/manager/supervisor) trying to access /field → send to workspace
    if ((role === 'tenant_admin' || role === 'supervisor' || role === 'viewer') && isFieldRoute) {
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
