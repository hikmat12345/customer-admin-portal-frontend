import { NEXT_PUBLIC_AUTH_SERVICE_URL, NEXT_PUBLIC_AUTH_URL } from 'config/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const accessToken = cookies().get('access_token')?.value;
  const bearerToken = cookies().get('token')?.value;

  if (!accessToken) {
    return NextResponse.json({
      message: 'Access token is required',
    });
  }

  try {
    const apiUrl = `${NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/logout`;
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
    });

    const apiResult = await apiResponse.json();

    if (!apiResult || !apiResult.status) {
      return NextResponse.json({ message: 'Something went, please try again' }, { status: 500 });
    }

    if (bearerToken) {
      cookies().delete('token');
    }

    if (accessToken) {
      cookies().delete('access_token');
    }

    return NextResponse.json({
      redirectUrl: NEXT_PUBLIC_AUTH_URL,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Something went, please try again' }, { status: 500 });
  }
}
