import api from '@/lib/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  await api.post('/auth/signout');

  return NextResponse.redirect(new URL('/login', request.url));
}
