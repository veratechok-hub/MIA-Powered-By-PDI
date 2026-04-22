import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// The password can be set via environment variable, defaults to "mia2024" for demo
const SITE_PASSWORD = process.env.SITE_PASSWORD || "mia2024";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === SITE_PASSWORD) {
      // Set an HTTP-only cookie that expires in 7 days
      const cookieStore = await cookies();
      cookieStore.set("mia_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("mia_auth");

  return NextResponse.json({
    authenticated: authCookie?.value === "authenticated",
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("mia_auth");

  return NextResponse.json({ success: true });
}
