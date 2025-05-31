import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

interface EmptyStateMessageProps {
  title: string;
  message: string;
  actionLink?: string;
  actionText?: string;
  icon?: React.ReactNode;
}

export default function EmptyStateMessage({
  title,
  message,
  actionLink,
  actionText,
  icon
}: EmptyStateMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">{message}</p>
      {actionLink && actionText && (
        <Link to={actionLink}>
          <Button>{actionText}</Button>
        </Link>
      )}
    </div>
  );
}