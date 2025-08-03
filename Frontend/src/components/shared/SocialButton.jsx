import React from 'react';

const SocialButton = ({ providerName, icon, onClick, className, action="Sign in" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full inline-flex justify-center items-center py-2.5 px-4 border rounded-md shadow-sm 
                  text-sm font-medium transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                  ${className || 
                    `bg-white dark:bg-slate-700 
                     border-slate-300 dark:border-slate-600 
                     text-slate-700 dark:text-slate-200 
                     hover:bg-slate-50 dark:hover:bg-slate-600 
                     focus:ring-offset-white dark:focus:ring-offset-gray-800` 
                }`} 
    >
      <span className="mr-2 flex items-center justify-center h-5 w-5">{icon}</span>
      {`${action} with ${providerName}`}
    </button>
  );
};

export default SocialButton;