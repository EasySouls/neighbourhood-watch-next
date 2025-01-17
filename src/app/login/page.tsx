import { handleLogin } from './action';
import Link from 'next/link';
import LoginForm from '@/components/auth/login-form';

export default async function LoginPage() {
  return (
    <main className='flex flex-col items-center h-screen'>
      <h1 className='mt-20 mb-8 text-primary text-2xl'>Bejelentkezés</h1>

      <LoginForm handleLoginAction={handleLogin} />

      <div className='flex flex-col items-center gap-2 mt-8'>
        <p>Még nem regisztráltál?</p>
        <Link href='/signup' className='underline'>
          Regisztráció
        </Link>
      </div>
    </main>
  );
}
