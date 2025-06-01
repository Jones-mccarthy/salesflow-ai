import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps): React.ReactElement {
  const { business_name } = useAuth();
  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();
  
  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) setPageTitle('Dashboard');
    else if (path.includes('/inventory')) setPageTitle('Inventory');
    else if (path.includes('/sales')) setPageTitle('Sales');
    else if (path.includes('/debts')) setPageTitle('Debts');
    else if (path.includes('/insights')) setPageTitle('Insights');
    else if (path.includes('/staff')) setPageTitle('Staff Management');
    else if (path.includes('/subscription')) setPageTitle('Subscription');
    else setPageTitle('');
  }, [location]);

  return (
    <header className="glass-panel border-b border-gray-700/50 py-3 px-4 md:px-6">
      <div className="flex items-center">
        {/* Menu button */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md bg-gray-800/80 text-white mr-3"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Page title and business name */}
        {pageTitle && (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide flex items-center">
              {pageTitle}
              {business_name && (
                <span className="ml-3 text-base text-cyan-400 bg-clip-text">
                  | {business_name}
                </span>
              )}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded mt-2"></div>
          </div>
        )}
      </div>
    </header>
  );
}