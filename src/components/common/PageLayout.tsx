import { ReactNode } from 'react';
import Header from './Header';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-light p-5">
      <Header />
      {children}
    </div>
  );
};

export default PageLayout;
