import { NEXT_PUBLIC_AUTH_SERVICE_URL } from 'config/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const refreshToken = cookies().get('refresh_token')?.value;
  const bearerToken = cookies().get('token')?.value;

  if (!refreshToken) {
    return NextResponse.json({});
  }

  try {
    const apiUrl = `${NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/refresh`;
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    });

    const apiResult = await apiResponse.json();
    if (apiResult && apiResult.idToken && apiResult.refreshToken && apiResult.accessToken) {
      const secure = process.env.NODE_ENV === 'production';
      cookies().set('token', apiResult.idToken, { path: '/', httpOnly: false, secure });
      cookies().set('refresh_token', apiResult.refreshToken, { path: '/', httpOnly: true, secure });
      cookies().set('access_token', apiResult.accessToken, { path: '/', httpOnly: true, secure });

      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({ message: apiResult });
  } catch (error: any) {
    console.error('[Token Refresh] error', error);
    return NextResponse.json(
      { message: error.response.data.message || 'Something went wrong' },
      {
        status: 500,
      },
    );
  }
}
