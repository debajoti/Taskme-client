import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-200 flex justify-center items-center">
      <div className="flex justify-center items-center lg:w-1/3 p-6 lg:p-14 rounded-2xl bg-transparent z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;