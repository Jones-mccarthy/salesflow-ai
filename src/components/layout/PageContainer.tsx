import React from 'react';
import type { ReactNode } from 'react';


interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export default function PageContainer({ children }: PageContainerProps): React.ReactElement {
  return (
    <div className="w-full">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}