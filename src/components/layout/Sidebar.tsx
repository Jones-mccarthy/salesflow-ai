import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'chart-bar', roles: ['admin'] },
  { name: 'Sales', path: '/sales', icon: 'shopping-cart', roles: ['admin', 'staff'] },
  { name: 'Inventory', path: '/inventory', icon: 'cube', roles: ['admin', 'staff'] },
  { name: 'Debts', path: '/debts', icon: 'credit-card', roles: ['admin', 'staff'] },
  { name: 'Insights', path: '/insights', icon: 'light-bulb', roles: ['admin', 'staff'] },
  { name: 'Staff Management', path: '/staff', icon: 'users', roles: ['admin'] },
  { name: 'Subscription', path: '/subscription', icon: 'credit-card', roles: ['admin'] },
];

export default function Sidebar(): React.ReactElement {
  const location = useLocation();
  const { role, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(role || '')
  );

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-gray-800/80 text-white"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 glass-panel border-r border-gray-700/50 h-screen fixed md:sticky top-0 z-40 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-center p-2 mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SalesFlow AI
            </h2>
          </div>
          
          <nav className="space-y-1 flex-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            {/* User role badge */}
            {role && (
              <div className="mb-2 px-4 py-2">
                <div className="flex items-center">
                  <div className="text-xs text-gray-400 mr-2">Logged in as:</div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    role === 'admin' ? 'bg-indigo-900/50 text-indigo-400' : 'bg-cyan-900/50 text-cyan-400'
                  }`}>
                    {role.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            {/* Logout button */}
            <button 
              onClick={logout}
              className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-red-900/30 hover:text-white transition-colors w-full"
            >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1v12zm9 1a1 1 0 011 1v6a1 1 0 11-2 0V5a1 1 0 011-1z" />
                  <path d="M11 8a1 1 0 00-1-1H6a1 1 0 100 2h4a1 1 0 001-1z" />
                </svg>
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function getIcon(name: string): React.ReactElement {
  switch (name) {
    case 'chart-bar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      );
    case 'shopping-cart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      );
    case 'cube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      );
    case 'credit-card':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      );
    case 'light-bulb':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
      );
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
  }
}