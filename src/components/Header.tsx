import LoginButton from './auth/LoginButton';

export default function Header() {
  return (
    <header className='bg-primary text-white text-center p-4'>
      <h1>Neighbourhood Watch</h1>

      <div className='flex items-center gap-2 h-full justify-center'>
        <LoginButton />
      </div>
    </header>
  );
}
