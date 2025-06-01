import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Header(): React.ReactElement {
  const { user, business_name, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
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
    <header className="glass-panel border-b border-gray-700/50 py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        {pageTitle && (
          <div>
            <h1 className="text-2xl font-bold text-white/90 tracking-wide flex items-center">
              {pageTitle}
              {business_name && <span className="ml-3 text-cyan-400">| {business_name}</span>}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded mt-2"></div>
          </div>
        )}
      </div>
      
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white"
        >
          <span className="hidden md:inline-block">{user?.email}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm10.293 4.293a1 1 0 01-1.414 0L7.05 11.464a1 1 0 011.414-1.414L10 11.586l1.536-1.536a1 1 0 111.414 1.414l-2.657 2.657z" clipRule="evenodd" />
          </svg>
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 glass-panel rounded-md shadow-lg py-1 z-10">
            <Link 
              to="/subscription" 
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white"
              onClick={() => setShowDropdown(false)}
            >
              Subscription
            </Link>
            <button
              onClick={() => {
                setShowDropdown(false);
                logout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}