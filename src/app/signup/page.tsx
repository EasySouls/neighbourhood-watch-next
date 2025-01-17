import SignUpForm from '@/components/auth/sign-up-form';

export default async function SignUpPage() {
  return (
    <main className='flex flex-col items-center'>
      <h1 className='mt-20 mb-8 text-primary text-2xl'>Regisztráció</h1>
      <div className='flex flex-col items-center gap-4 w-1/2'>
        <SignUpForm />
      </div>
    </main>
  );
}
