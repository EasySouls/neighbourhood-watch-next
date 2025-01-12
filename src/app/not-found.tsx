import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-lg'>Sajnos a keresett oldal nem található</p>
      <Link href='/' className='underline'>
        Vissza a főoldalra
      </Link>
    </div>
  );
}
