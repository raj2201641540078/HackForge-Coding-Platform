import React, { useState, useCallback } from 'react';
import { ArrowLeft, Zap, Lock } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router';

/**
 * PremiumCheckoutPage
 * Shows an order summary for the selected plan and integrates Razorpay checkout.
 */
const PremiumCheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { plan } = useOutletContext();

  // Simulate server-side order creation
  const createOrderOnServer = useCallback(async (amount) => {
    console.log("Simulating order creation for amount:", amount);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `order_demo_${Date.now()}`;
  }, []);

  // Payment success callback
  const onPaymentSuccess = useCallback(() => {
    setIsLoading(false);
    // TODO: Redirect to success page or show confirmation
    console.log("Payment Successful");
  }, []);

  // Payment failure callback
  const onPaymentFailure = useCallback(() => {
    setIsLoading(false);
    // TODO: Show toast or error message
    console.log("Payment Failed or Cancelled");
  }, []);

  // Display Razorpay modal
  const displayRazorpay = useCallback(async () => {
    if (!plan || !plan.priceInPaisa) return;

    setIsLoading(true);
    const order_id = await createOrderOnServer(plan.priceInPaisa);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use REACT_APP_ prefix for env vars in CRA/Vite
      amount: plan.priceInPaisa,
      currency: 'INR',
      name: 'HackForge Premium',
      description: `Payment for ${plan.name} - ${plan.billingCycle}`,
      order_id,
      handler: () => onPaymentSuccess(),
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      notes: {
        plan_id: plan.id,
        billing_cycle: plan.billingCycle,
      },
      theme: {
        color: '#f97316',
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false);
          onPaymentFailure();
        },
      },
    };

    // Ensure Razorpay script is loaded
    if (!window.Razorpay) {
      console.error('Razorpay SDK not loaded.');
      setIsLoading(false);
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', () => {
      setIsLoading(false);
      onPaymentFailure();
    });
    razorpay.open();
  }, [plan, createOrderOnServer, onPaymentFailure, onPaymentSuccess]);


  return (
    <div className="max-w-4xl mx-auto pt-10 pb-40 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/premium-plans')}
        className="flex items-center space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-10"
        aria-label="Back to Premium Plans"
      >
        <ArrowLeft size={16} />
        <span>Back to Plans</span>
      </button>

      {plan ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
            {/* Left Side: Order Summary */}
            <div>
              <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                Order Summary
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Confirm your subscription details before payment.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {plan.name} Plan
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {plan.billingCycle} Billing
                    </div>
                  </div>
                  <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                    {plan.price}
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-600 my-3"></div>

                <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-slate-100">
                  <span>Total Due Today</span>
                  <span>{plan.price}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Payment Button */}
            <div className="mt-10 md:mt-0 flex flex-col justify-center">
              <button
                onClick={displayRazorpay}
                disabled={isLoading}
                className="w-full bg-orange-500 text-white font-semibold py-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Proceed to Pay</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Lock size={14} aria-hidden="true" />
                <span>Secure payment via Razorpay</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-4">
                By confirming, you allow HackForge to charge you for this payment
                and future payments in accordance with their terms.
              </p>
            </div>
          </div>
        </div>) : (
          <div className="max-w-xl mx-auto mt-20 text-center text-red-500">
            No plan selected. Please go back and choose a plan.
          </div>
        )
      }


    </div>
  );
};

export default PremiumCheckoutPage;
