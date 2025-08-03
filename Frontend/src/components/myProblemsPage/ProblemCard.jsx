import React from 'react';
import { Heart, Star, Bookmark } from 'lucide-react';
import { NavLink } from 'react-router';

const ProblemCard = ({ problem }) => {
  const { title, difficulty, isLiked, isFavourited, status } = problem;

  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const ActionButton = ({ isToggled, icon, toggledClasses, ariaLabel }) => (
    <button
      aria-label={ariaLabel}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isToggled
          ? toggledClasses
          : 'text-slate-400'
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
      <div>
        <span
          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${difficultyStyles[difficulty]}`}
        >
          {difficulty}
        </span>
        <h3 className="text-lg font-bold mt-3 text-[#1e293b] dark:text-[#e2e8f0]">
          {title}
        </h3>
      </div>
      <div className="mt-4 pt-4 border-t border-[#e2e8f0] dark:border-[#334155] flex items-center justify-between">
        <NavLink to={`/problems/${problem._id}`} className="text-sm font-semibold text-[#f97316] hover:underline">
          Solve Problem
        </NavLink>
        <div className="flex items-center space-x-1">
          <ActionButton
            isToggled={isLiked}
            icon={<Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />}
            toggledClasses="text-pink-500 bg-pink-500/10"
            ariaLabel="Like problem"
          />
          <ActionButton
            isToggled={isFavourited}
            icon={<Star size={20} fill={isFavourited ? 'currentColor' : 'none'} />}
            toggledClasses="text-amber-400 bg-amber-400/10"
            ariaLabel="Favorite problem"
          />
          {/* <ActionButton
            isToggled={status.isBookmarked}
            // onClick={() => onStatusChange(id, 'bookmarked')}
            icon={<Bookmark size={20} fill={status.isBookmarked ? 'currentColor' : 'none'} />}
            toggledClasses="text-blue-400 bg-blue-400/10"
            ariaLabel="Bookmark problem"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
