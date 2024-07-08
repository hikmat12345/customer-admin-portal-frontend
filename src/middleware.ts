import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const iToken = searchParams.get('id_token');
  const rToken = searchParams.get('refresh_token');
  const aToken = searchParams.get('access_token');

  if (iToken && rToken && aToken) {
    const response = NextResponse.redirect(request.nextUrl.origin);

    response.cookies.set('token', iToken, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    response.cookies.set('refresh_token', rToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    response.cookies.set('access_token', aToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return response;
  }

  const idToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const accessToken = request.cookies.get('access_token')?.value;

  // if (!idToken || !refreshToken || !accessToken) {
  //   const authServiceFrontend = String(process.env.NEXT_PUBLIC_AUTH_URL);
  //   return NextResponse.redirect(authServiceFrontend);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
