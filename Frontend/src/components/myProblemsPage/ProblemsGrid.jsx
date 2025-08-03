import React from 'react';
import ProblemCard from './ProblemCard';

const ProblemsGrid = ({ problems }) => {
  if (problems.length === 0) {
    return (
      <div className="text-center py-24 bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-[#1e293b] dark:text-[#e2e8f0]">
          No Problems Found
        </p>
        <p className="mt-2 text-[#475569] dark:text-[#94a3b8]">
          Try selecting a different filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {problems.map((problem) => (
        <ProblemCard
          key={problem._id}
          problem={problem}
        />
      ))}
    </div>
  );
};

export default ProblemsGrid;
