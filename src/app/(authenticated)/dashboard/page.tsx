import DashboardHeader from '@/components/dashboard-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <div>
      <DashboardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </DashboardHeader>
      <div className='flex flex-1 flex-col gap-4 p-4'>
        <Skeleton className='h-16' />
        <Skeleton className='h-16' />
      </div>
    </div>
  );
}
