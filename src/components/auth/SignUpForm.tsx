'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { signUpSchema } from '@/types/schemas';
import { useToast } from '@/hooks/use-toast';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      const res = await api.post('/identity/register', data);
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const signUpErrors = (error as any).response.data.errors;
      const errorMessages = Object.keys(signUpErrors)
        .map((key) => `${signUpErrors[key]}`)
        .join(', ');
      toast({
        title: 'Hiba történt a regisztráció során',
        description: errorMessages,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='firstName'>Keresztnév</FormLabel>
              <FormControl>
                <Input id='firstName' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='lastName'>Vezetéknév</FormLabel>
              <FormControl>
                <Input id='lastName' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='email'>Email-cím</FormLabel>
              <FormControl>
                <Input id='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password'>Jelszó</FormLabel>
              <FormControl>
                <Input id='password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='confirmPassword'>
                Jelszó megerősítése
              </FormLabel>
              <FormControl>
                <Input id='confirmPassword' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Regisztrálás</Button>
      </form>
    </Form>
  );
}
