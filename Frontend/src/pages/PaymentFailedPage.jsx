import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const PaymentFailedPage = ({ onRetry, onBackToPlans }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-10">
      <div className="p-4 bg-red-500/10 rounded-full mb-6">
        <AlertTriangle size={64} className="text-red-500" />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
        Payment Failed
      </h1>

      <p className="mt-4 text-lg text-[#475569] dark:text-[#94a3b8]">
        Unfortunately, we couldn't process your payment. This could be due to a
        network issue, or the payment was cancelled.
      </p>

      <div className="mt-8 w-full flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="w-full bg-[#f97316] text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>

        <button
          onClick={onBackToPlans}
          className="w-full bg-[#ffffff] dark:bg-[#232b3b] text-[#1e293b] dark:text-[#e2e8f0] font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 dark:hover:bg-[#334155] transition-colors border border-[#e2e8f0] dark:border-[#334155]"
        >
          <ArrowLeft size={16} />
          <span>View Plans</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
