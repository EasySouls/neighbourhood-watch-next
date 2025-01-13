import LoginPage from '@/app/login/page';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

vi.mock('@/app/login/action', () => ({
  handleLogin: vi.fn(() => {
    return { status: 'idle' };
  }),
}));

vi.mock('@/components/auth/LoginForm', async () => {
  const originalModule = await vi.importActual('@/components/auth/LoginForm');
  return {
    ...originalModule,
    default: originalModule.default,
    useActionState: vi.fn(() => {
      return [{ status: 'idle' }, vi.fn()];
    }),
  };
});

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and register link correctly', async () => {
    render(await LoginPage());
    const pageTitle = screen.getByRole('heading', {
      level: 1,
      name: 'Bejelentkezés',
    });

    const registerLink = screen.getByRole('link', {
      name: /Regisztráció/i,
    });

    expect(pageTitle).toBeDefined();
    expect(registerLink).toBeDefined();
  });

  it('calls the handleLoginAction function on form submission', async () => {
    const { handleLogin } = await vi.importMock('@/app/login/action');
    render(await LoginPage());

    const emailInput = screen.getByPlaceholderText('E-mail cím');
    const passwordInput = screen.getByPlaceholderText('Jelszó');
    const submitButton = screen.getByRole('button', { name: /Bejelentkezés/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(handleLogin).toHaveBeenCalled();
  });
});
