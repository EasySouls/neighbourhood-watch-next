'use client';

import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { FiLogIn } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from '@/lib/actions';

export default function LoginButton() {
  const { data: user, mutate } = useProfile();
  const router = useRouter();

  function handleNavigateToProfile() {
    router.push('/profile');
  }

  function handleNavigateToLogin() {
    router.push('/login');
  }

  async function handleSignOut() {
    await signOut();
    await mutate(undefined);
    router.replace('/login');
  }

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.email} />
              <AvatarFallback className='text-primary text-2xl uppercase'>
                {user.email[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNavigateToProfile}>
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Kijelentkezés
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
