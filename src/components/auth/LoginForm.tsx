'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginState } from '@/types/actionTypes';

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

  useEffect(() => {
    if (formState.status === 'success') {
      router.push('/dashboard');
    }
  }, [formState, router]);

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
