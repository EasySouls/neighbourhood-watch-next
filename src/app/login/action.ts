'use server';

import api from '@/lib/api';
import { LoginResponse } from '@/types';
import { LoginState } from '@/types/actionTypes';
import { cookies } from 'next/headers';

/**
 * Handles the login process by sending the provided form data to the login API endpoint.
 *
 * @param prevState - The previous state of the login process.
 * @param formData - The form data containing the user's email and password.
 * @returns A promise that resolves to the new state of the login process.
 *
 * The function performs the following steps:
 * 1. Extracts the email and password from the form data.
 * 2. Validates that both email and password are provided.
 * 3. Sends a POST request to the login API endpoint with the login data.
 * 4. If the response status is 200 and an access token is received, sets the token in cookies and returns a success state.
 * 5. Handles errors and returns appropriate error messages for missing data, invalid credentials, or other errors.
 */
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
