'use server';

import api from '@/lib/api';
import { LoginResponse } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!loginData.email || !loginData.password) {
    return;
  }

  try {
    console.log(loginData);
    const res = await api.post('/identity/login', loginData);

    if (res.status === 200) {
      const loginRes = res.data as LoginResponse;
      if (!loginRes.accessToken) {
        return;
      }

      console.log(loginRes);

      const cookieStore = await cookies();
      cookieStore.set('token', loginRes.accessToken);
    }
  } catch (e) {
    console.error(e);
    return;
  }

  // Redirecting inside the try-catch throws an error
  redirect('/dashboard');
}
