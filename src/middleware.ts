import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const a_token = request.nextUrl.searchParams.get('access_token');

  if (a_token) {
    const response = NextResponse.redirect(request.nextUrl.origin);

    response.cookies.set({
      name: 'token',
      value: a_token,
      path: '/',
    });
    return response;
  }

  const access_token = request.cookies.get('token')?.value;

  //   if (!access_token) {
  //     const authServiceFrontend = String(process.env.NEXT_PUBLIC_AUTH_URL);
  //     return NextResponse.redirect(authServiceFrontend);
  //   }

  //   return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
