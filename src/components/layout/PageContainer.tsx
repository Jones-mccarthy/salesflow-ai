import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export default function PageContainer({ children, title }: PageContainerProps) {
  const { businessName } = useAuth();
  
  return (
    <div className="w-full">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}