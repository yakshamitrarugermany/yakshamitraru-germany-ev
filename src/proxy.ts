import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

function decodeBasicAuth(encoded: string): string | null {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.length !== bBytes.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }

  return diff === 0;
}

function isValidBasicAuth(
  authHeader: string | null,
  expectedUser: string,
  expectedPassword: string,
): boolean {
  if (!authHeader) {
    return false;
  }

  const match = authHeader.match(/^Basic\s+(\S+)$/i);
  if (!match) {
    return false;
  }

  const decoded = decodeBasicAuth(match[1]);
  if (decoded === null) {
    return false;
  }

  const colonIndex = decoded.indexOf(":");
  if (colonIndex === -1) {
    return false;
  }

  const user = decoded.slice(0, colonIndex);
  const password = decoded.slice(colonIndex + 1);
  const userMatches = safeEqual(user, expectedUser);
  const passwordMatches = safeEqual(password, expectedPassword);

  return userMatches && passwordMatches;
}

export function proxy(request: NextRequest) {
  const previewPassword = process.env.PREVIEW_PASSWORD;
  if (previewPassword) {
    const previewUser = process.env.PREVIEW_USER || "preview";
    const authHeader = request.headers.get("authorization");

    if (!isValidBasicAuth(authHeader, previewUser, previewPassword)) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Preview"',
        },
      });
    }
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
      return NextResponse.next();
    }

    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};
