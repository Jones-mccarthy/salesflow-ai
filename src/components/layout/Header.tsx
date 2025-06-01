import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Header(): React.ReactElement {
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
      <div className="flex items-center justify-center md:justify-start">
        <div className="ml-6 md:ml-0">
          {pageTitle && (
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide flex flex-col md:flex-row items-center md:items-baseline">
                {pageTitle}
                {business_name && <span className="mt-1 md:mt-0 md:ml-3 text-sm md:text-base text-cyan-400">| {business_name}</span>}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded mt-2 mx-auto md:mx-0"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}