import { NEXT_PUBLIC_AUTH_URL } from 'config/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();

  const token = cookieStore.get('token');

  if (token) {
    cookieStore.delete('token');
  }

  return NextResponse.json({
    redirectUrl: NEXT_PUBLIC_AUTH_URL,
  });
}
