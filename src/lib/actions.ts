'use server';

import { cookies } from 'next/headers';

export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('token');
  } catch (error) {
    console.error(error);
    return;
  }
}
