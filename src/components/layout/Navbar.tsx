import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  userRole?: 'admin' | 'staff' | null;
}

export default function Navbar({ userRole }: NavbarProps): React.ReactElement | null {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Don't show navbar on landing page or auth pages
  if (location.pathname === '/' || location.pathname.startsWith('/login')) {
    return null;
  }

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Inventory', path: '/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Sales', path: '/sales', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Debts', path: '/debts', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Insights', path: '/insights', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Staff', path: '/admin/staff', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Subscription', path: '/subscription', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
  ];

  const staffLinks = [
    { name: 'Inventory', path: '/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Sales', path: '/sales', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const links = userRole === 'admin' ? adminLinks : staffLinks;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 w-20 hidden md:flex flex-col bg-slate-900/60 backdrop-blur-lg shadow-lg border-r border-slate-700/50 z-10">
        <div className="flex items-center justify-center h-16 border-b border-slate-700/50">
          <span className="text-2xl font-bold gradient-text">SF</span>
        </div>
        <div className="flex-1 flex flex-col items-center pt-5 space-y-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center w-16 py-2 rounded-md transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-cyan-500/20 text-cyan-300 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
              </svg>
              <span className="text-[10px] mt-1 font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile header */}
      <header className="md:hidden sticky top-0 bg-slate-900/70 backdrop-blur-lg shadow-lg border-b border-slate-700/50 z-10">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">SalesFlow AI</span>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-slate-900/80 backdrop-blur-lg border-t border-slate-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                  </svg>
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/"
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}