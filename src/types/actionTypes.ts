export type LoginState = {
  status: 'success' | 'error' | 'idle';
  message?: string;
};
