import { NextRequest, NextResponse } from 'next/server';
import { User } from './types';
import * as Sentry from '@sentry/nextjs';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  console.log('Token in request: ' + token?.value);
  if (!token) {
    Sentry.setUser(null);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  const res = await fetch(`${baseUrl}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  console.log(res.status);

  if (res.status !== 200) {
    Sentry.setUser(null);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  const user = (await res.json()) as User;

  Sentry.setUser({
    id: user.email,
    email: user.email,
    username: `${user.firstName} ${user.lastName}`,
  });
}

export const config = {
  matcher: ['/profile', '/dashboard', '/'],
};
