"use client"
import { FC, ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthProvider';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

export default DashboardLayout;