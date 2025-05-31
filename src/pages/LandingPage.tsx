import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold gradient-text">SalesFlow AI</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login/admin">
              <Button variant="secondary" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-cyan-500 shadow-lg mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Manage Your Shop <span className="gradient-text">Smarter</span> with SalesFlow AI
                </h1>
                <p className="text-xl mb-8 text-slate-300 leading-relaxed">
                  The all-in-one solution for shop owners to manage sales, inventory, debts, and get AI-powered business insights.
                </p>
                <div className="flex space-x-4">
                  <Link to="/signup">
                    <Button size="lg" className="px-8">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">30-day free trial</span>
                </div>
                <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">No credit card required</span>
                </div>
              </div>
            </div>
            <div className="md:w-5/12">
              <div className="glass-enhanced rounded-lg shadow-xl p-6 transform transition-all hover:-translate-y-2 border-t border-cyan-500/30">
                <div className="absolute -top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Standard Plan</h3>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold gradient-text">20 GHS</span>
                    <span className="text-xl font-medium text-slate-400">/month</span>
                  </div>
                  <p className="mt-2 text-slate-300">
                    After your 30-day free trial
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {[
                    'Full inventory management',
                    'Sales tracking with voice input',
                    'Debt management system',
                    'AI-powered business insights',
                    'Mobile money payment',
                    'Unlimited products and sales',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup" className="block">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Everything You Need to Run Your Shop</h2>
            <p className="mt-4 text-xl text-slate-300">
              SalesFlow AI combines all essential tools in one simple application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Inventory Management',
                description: 'Track your stock levels and get alerts when items are running low.',
                icon: '📦',
              },
              {
                title: 'Sales Tracking',
                description: 'Record sales quickly with voice input and see daily performance.',
                icon: '💰',
              },
              {
                title: 'Debt Management',
                description: 'Keep track of what you owe and what customers owe you.',
                icon: '📝',
              },
              {
                title: 'AI Insights',
                description: 'Get smart recommendations to improve your business performance.',
                icon: '🧠',
              },
            ].map((feature, index) => (
              <div key={index} className="glass-enhanced rounded-lg shadow-lg p-6 text-center card-hover">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-enhanced mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold gradient-text">SalesFlow AI</h2>
              <p className="mt-2 text-slate-400">Simplifying shop management for everyone</p>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-slate-400">
                &copy; {new Date().getFullYear()} SalesFlow AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}