import { NEXT_PUBLIC_AUTH_SERVICE_URL } from 'config/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { refreshToken } = await request.json();
  const bearerToken = cookies().get('token')?.value;

  if (!refreshToken) {
    return NextResponse.json({});
  }

  try {
    const apiUrl = `${NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/refresh`;
    const stringifiedData = JSON.stringify({ refreshToken });
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: stringifiedData,

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    });

    const apiResult = await apiResponse.json();
    if (apiResult && apiResult.access_token && apiResult.refresh_token) {
      const secure = process.env.NODE_ENV === 'production';
      cookies().set('token', apiResult.access_token, { path: '/', httpOnly: false, secure });
      cookies().set('refresh_token', apiResult.refresh_token, { path: '/', httpOnly: false, secure });

      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({ message: apiResult });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      { message: error.response.data.message || 'Something went wrong' },
      {
        status: 401,
      },
    );
  }
}
