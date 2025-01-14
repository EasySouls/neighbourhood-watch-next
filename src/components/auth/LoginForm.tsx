'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginState } from '@/types/actionTypes';
import { useSWRConfig } from 'swr';

export default function LoginForm({
  handleLoginAction,
}: {
  handleLoginAction: (
    prevState: LoginState,
    formData: FormData
  ) => Promise<LoginState>;
}) {
  const [formState, formAction] = useActionState(handleLoginAction, {
    status: 'idle',
  });
  const router = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (formState.status === 'success') {
      // This revalidates the user profile data
      mutate('/auth/me');
      router.push('/dashboard');
    }
  }, [formState, router, mutate]);

  return (
    <form
      action={formAction}
      className='flex flex-col items-center gap-4 w-1/2'
    >
      <Input type='email' name='email' placeholder='E-mail cím' />
      <Input type='password' name='password' placeholder='Jelszó' />
      {formState.status === 'error' && (
        <p className='text-red-500'>{formState.message}</p>
      )}
      <Button type='submit'>Bejelentkezés</Button>
    </form>
  );
}
