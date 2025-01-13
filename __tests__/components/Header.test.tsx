import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
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
vi.mock('/hooks/useProfile', async () => ({
  data: {
    user: {
      name: 'Test User',
    },
  },
}));

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays the correct title', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', {
      level: 1,
      name: /Neighbourhood Watch/i,
    });
    expect(titleElement).toBeDefined();
  });

  it('renders the LoginButton component', () => {
    render(<Header />);
    const loginButton = screen.getByRole('button', { name: /Bejelentkezés/i });
    expect(loginButton).toBeDefined();
  });
});
