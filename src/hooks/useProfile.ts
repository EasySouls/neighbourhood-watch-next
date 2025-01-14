import useSwr from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import { User } from '@/types';

export default function useProfile() {
  return useSwr<User>(`/auth/me`, axiosGetFetcher, {
    shouldRetryOnError: false,
    refreshInterval: 1000 * 60 * 5,
  });
}
