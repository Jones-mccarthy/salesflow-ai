import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockSubscription } from '../utils/mockData';

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState(mockSubscription);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Update subscription status
      setSubscription({
        ...subscription,
        status: 'active',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysRemaining: 30,
      });
    }, 2000);
  };

  return (
    <PageContainer title="Subscription Management">
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Subscription</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                subscription.status === 'trial' 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'bg-green-900/30 text-green-400'
              }`}>
                {subscription.status === 'trial' ? 'Trial' : 'Active'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">Plan</span>
                <span className="font-medium text-white">Standard Plan</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">Price</span>
                <span className="font-medium text-white">20 GHS / month</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">Status</span>
                <span className="font-medium text-white">
                  {subscription.status === 'trial' ? 'Free Trial' : 'Paid'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">Expiry Date</span>
                <span className="font-medium text-white">{subscription.expiryDate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Time Remaining</span>
                <span className="font-medium text-white">
                  {subscription.daysRemaining} days
                </span>
              </div>
            </div>
            
            {subscription.status === 'trial' && (
              <div className="mt-8">
                <div className="bg-yellow-900/30 border-l-4 border-yellow-500/50 p-4 mb-6 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-400">
                        Your free trial will expire in {subscription.daysRemaining} days. Subscribe now to continue using SalesFlow AI.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/30 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-4">Payment Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="mobile-money"
                        name="payment-method"
                        type="radio"
                        checked
                        className="h-4 w-4 text-cyan-500 border-slate-600"
                      />
                      <label htmlFor="mobile-money" className="ml-3 block text-sm font-medium text-slate-300">
                        Mobile Money
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? 'Processing...' : 'Pay 20 GHS'}
                    </Button>
                  </div>
                  
                  {paymentSuccess && (
                    <div className="mt-4 p-3 bg-green-900/30 text-green-400 rounded-lg">
                      Payment successful! Your subscription has been extended.
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {subscription.status === 'active' && (
              <div className="mt-8 bg-green-900/30 border-l-4 border-green-500/50 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-400">
                      Your subscription is active. You will be billed again on {subscription.expiryDate}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}