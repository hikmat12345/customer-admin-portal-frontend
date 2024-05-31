import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) {
    cookieStore.delete("token");
  }

  const authServiceFrontendUrl = String(process.env.NEXT_PUBLIC_AUTH_URL);
  return NextResponse.json({
    redirectUrl: authServiceFrontendUrl,
  });
}
