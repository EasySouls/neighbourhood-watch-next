import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleLogin } from './action';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <main className='flex flex-col items-center h-screen'>
      <h1 className='mt-20 mb-8 text-primary text-2xl'>Bejelentkezés</h1>
      <form
        action={handleLogin}
        className='flex flex-col items-center gap-4 w-1/2'
      >
        <Input type='email' name='email' placeholder='E-mail cím' />
        <Input type='password' name='password' placeholder='Jelszó' />
        <Button type='submit'>Bejelentkezés</Button>
      </form>

      <div className='flex flex-col items-center gap-2 mt-8'>
        <p>Még nem regisztráltál?</p>
        <Link href='/signup' className='underline'>
          Regisztráció
        </Link>
      </div>
    </main>
  );
}
