import React from 'react';
import { HackForgeLogo } from '../components';

const LoadingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 absolute top-0 w-full h-full flex flex-col items-center justify-center z-[100]">
      <HackForgeLogo size={6} /> 
      <div>
        <span className="loading loading-ring loading-sm bg-black dark:bg-amber-50"></span>
        <span className="loading loading-ring loading-md bg-black dark:bg-amber-50"></span>
        <span className="loading loading-ring loading-lg bg-black dark:bg-amber-50"></span> 
      </div>
    </div>
  );
};

export default LoadingPage;