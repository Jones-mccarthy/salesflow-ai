import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

export default function Card({ children, className = '', title, noPadding = false }: CardProps): React.ReactElement {
  return (
    <div className={`glass-card rounded-lg overflow-hidden shadow-lg w-full transform-none ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-700/30 bg-gray-800/40">
          <h3 className="text-lg font-semibold text-white/90">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-4'}>{children}</div>
    </div>
  );
}