import React from 'react';
import { CheckCircle, Zap } from 'lucide-react';

const PaymentSuccessPage = ({ plan, onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-10">
      <div className="p-4 bg-green-500/10 rounded-full mb-6">
        <CheckCircle size={64} className="text-green-500" />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
        Payment Successful!
      </h1>

      <p className="mt-4 text-lg text-[#475569] dark:text-[#94a3b8]">
        Welcome to HackForge Premium! You have successfully subscribed to the
        <span className="font-bold text-[#1e293b] dark:text-[#e2e8f0]">
          {' '}
          {plan.name}
        </span>{' '}
        plan.
      </p>

      <div className="mt-8 bg-[#ffffff] dark:bg-[#232b3b] rounded-xl p-6 border border-[#e2e8f0] dark:border-[#334155] w-full">
        <h2 className="text-xl font-bold mb-4 text-[#1e293b] dark:text-[#e2e8f0]">
          You now have access to:
        </h2>
        <ul className="space-y-3 text-left">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center space-x-3">
              <Zap size={16} className="text-[#f97316] flex-shrink-0" />
              <span className="text-[#475569] dark:text-[#94a3b8]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onComplete}
        className="w-full mt-8 bg-[#f97316] text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
      >
        Start Hacking
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
