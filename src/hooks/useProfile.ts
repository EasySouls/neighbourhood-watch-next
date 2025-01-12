import useSwr from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import { User } from '@/types';

export default function useProfile(): {
  data: User | undefined;
  isLoading: boolean;
  error: unknown;
} {
  return useSwr<User>(`/auth/me`, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
