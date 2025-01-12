'use client';

import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FiLogIn } from 'react-icons/fi';

export default function LoginButton() {
  const { data: user } = useProfile();
  const router = useRouter();

  function handleNavigateToProfile() {
    router.push('/profile');
  }

  function handleNavigateToLogin() {
    router.push('/login');
  }

  return (
    <>
      {user && (
        <div className='flex items-center gap-2 h-full justify-center'>
          <Button
            onClick={handleNavigateToProfile}
            className='bg-white text-primary'
          >
            Profil
          </Button>
        </div>
      )}

      {!user && (
        <Button onClick={handleNavigateToLogin}>
          Bejelentkezés
          <FiLogIn />
        </Button>
      )}
    </>
  );
}
