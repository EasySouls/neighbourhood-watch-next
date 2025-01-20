import Link from 'next/link';
import LoginButton from './auth/login-button';

export const experimental_ppr = true;

export default function Header() {
  return (
    <header className='bg-blue-900 text-white h-[--header-height] text-center p-4 flex justify-between items-center]'>
      <Link href='/' passHref>
        <h1 className='text-lg lg:text-xl xl:text-2xl'>Neighbourhood Watch</h1>
      </Link>

      <div className='flex items-center gap-2 h-full justify-center'>
        <LoginButton />
      </div>
    </header>
  );
}
