import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/api';
import { User } from './types';
import * as Sentry from '@sentry/nextjs';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) {
    Sentry.setUser(null);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  const res = await api.get('/auth/me');
  if (res.status !== 200) {
    Sentry.setUser(null);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  const user = res.data as User;
  Sentry.setUser({
    id: user.email,
    email: user.email,
    username: `${user.firstName} ${user.lastName}`,
  });
}

export const config = {
  matcher: ['/profile', '/dashboard', '/'],
};
