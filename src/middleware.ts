import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const a_token = searchParams.get('access_token');
  const r_token = searchParams.get('refresh_token');

  if (a_token && r_token) {
    const response = NextResponse.redirect(request.nextUrl.origin);

    response.cookies.set('token', a_token, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    response.cookies.set('refresh_token', r_token, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return response;
  }

  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    const authServiceFrontend = String(process.env.NEXT_PUBLIC_AUTH_URL);
    return NextResponse.redirect(authServiceFrontend);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
