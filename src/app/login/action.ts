'use server';

import api from '@/lib/api';
import { LoginResponse } from '@/types';
import { LoginState } from '@/types/actionTypes';
import { cookies } from 'next/headers';

export async function handleLogin(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!loginData.email || !loginData.password) {
    return { status: 'error', message: 'Hiányzó adatok' };
  }

  try {
    console.log(loginData);
    const res = await api.post('/identity/login', loginData);

    if (res.status === 200) {
      const loginRes = res.data as LoginResponse;
      if (!loginRes.accessToken) {
        return { status: 'error', message: 'Hibás adatok' };
      }

      console.log(loginRes);

      const cookieStore = await cookies();
      cookieStore.set('token', loginRes.accessToken);

      return { status: 'success' };
    }
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'Hiba történt' };
  }

  return { status: 'error', message: 'Ismeretlen hiba' };
}
