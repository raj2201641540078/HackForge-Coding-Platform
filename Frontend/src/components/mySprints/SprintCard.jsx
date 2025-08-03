import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useNavigate } from 'react-router';

const SprintCard = ({ sprint }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'border-l-green-500',
    Medium: 'border-l-yellow-500',
    Hard: 'border-l-red-500',
  };

  return (
    <div className="bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#1e293b] dark:text-[#e2e8f0]">
            {sprint.sprintName}
          </h3>
          <p className="text-sm text-[#475569] dark:text-[#94a3b8] mt-1">
            {sprint.description}
          </p>
        </div>
        <span
          className={`flex-shrink-0 ml-4 flex items-center space-x-1.5 text-xs font-medium px-2 py-1 rounded-full ${
            sprint.isPublic
              ? 'bg-blue-500/10 text-blue-400'
              : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {sprint.isPublic ? <Unlock size={12} /> : <Lock size={12} />}
          <span>{sprint.isPublic ? 'Public' : 'Private'}</span>
        </span>
      </div>

      <div className="flex-grow space-y-3 mb-6">
        {sprint.problems.map((problem) => {
          return (
            <div
              key={problem._id}
              className={`bg-[#f8fafc] dark:bg-[#1a2332] p-3 rounded-lg border-l-4 ${
                difficultyColors[problem.difficulty]
              } flex justify-between items-center`}
            >
              <span className="font-medium text-sm text-[#475569] dark:text-[#94a3b8]">
                {problem.title}
              </span>
              <div className="flex items-center space-x-2">
                {/* <Heart
                  size={16}
                  className={`transition-colors ${
                    status.isLiked ? 'text-pink-500' : 'text-slate-500'
                  }`}
                  fill={status.isLiked ? 'currentColor' : 'none'}
                />
                <Star
                  size={16}
                  className={`transition-colors ${
                    status.isFavorited ? 'text-amber-400' : 'text-slate-500'
                  }`}
                  fill={status.isFavorited ? 'currentColor' : 'none'}
                /> */}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate(`${sprint.sprintName}`)}
        className="w-full bg-[#f97316] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        View Sprint
      </button>
    </div>
  );
};

export default SprintCard;
