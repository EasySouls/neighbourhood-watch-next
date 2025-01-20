import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export const experimental_ppr = true;

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='h-full p-4 w-full'>{children}</main>
    </SidebarProvider>
  );
}
