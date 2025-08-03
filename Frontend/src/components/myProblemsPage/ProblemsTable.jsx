import React from 'react';
import { Heart, Star } from 'lucide-react';
import Icon from '../shared/Icon';
import { NavLink } from 'react-router';

const ProblemsTable = ({ problems }) => {
  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400',
    Medium: 'bg-yellow-500/10 text-yellow-400',
    Hard: 'bg-red-500/10 text-red-400',
  };

  const ActionButton = ({ isToggled, icon, toggledClasses, ariaLabel }) => (
    <button
      aria-label={ariaLabel}
      className={`p-1.5 rounded-full transition-colors duration-200 ${
        isToggled
          ? toggledClasses
          : 'text-slate-500'
      }`}
    >
      {icon}
    </button>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-green-600 dark:text-green-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Solved" }}
          />
        );
      case 'Attempted':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Attempted" }}
          />
        );
      case 'Todo':
      default:
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-slate-400 dark:text-gray-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "To Do" }}
          />
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-[#475569] dark:text-[#94a3b8]">
        <thead className="text-xs text-[#475569] dark:text-[#94a3b8] uppercase bg-[#f8fafc] dark:bg-[#1a2332]">
          <tr>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4">Title</th>
            <th scope="col" className="px-6 py-4">Difficulty</th>
            <th scope="col" className="px-6 py-4">Tags</th>
            <th scope="col" className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr
              key={problem._id}
              className="border-b border-[#e2e8f0] dark:border-[#334155] hover:bg-[#f8fafc] dark:hover:bg-[#1a2332]/50"
            >
              <td className="px-6 py-4" title={problem.status || 'To Do'}>
                {getStatusIcon(problem.status)}
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-[#1e293b] dark:text-[#e2e8f0] whitespace-nowrap"
              >
                <NavLink to={`/problems/${problem._id}`} className="hover:text-[#f97316] transition-colors">
                  {problem.title}
                </NavLink>
              </th>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200/50 dark:bg-gray-700/50 px-2 py-0.5 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <ActionButton
                    isToggled={problem.isLiked}
                    icon={
                      <Heart
                        size={16}
                        fill={problem.isLiked ? 'currentColor' : 'none'}
                      />
                    }
                    toggledClasses="text-pink-500 bg-pink-500/10"
                    ariaLabel="Like problem"
                  />
                  <ActionButton
                    isToggled={problem.isFavourited}
                    icon={
                      <Star
                        size={16}
                        fill={problem.isFavourited ? 'currentColor' : 'none'}
                      />
                    }
                    toggledClasses="text-amber-400 bg-amber-400/10"
                    ariaLabel="Favorite problem"
                  />
                  {/* <ActionButton
                    isToggled={problem.status.isBookmarked}
                    icon={
                      <Bookmark
                        size={16}
                        fill={problem.status.isBookmarked ? 'currentColor' : 'none'}
                      />
                    }
                    toggledClasses="text-blue-400 bg-blue-400/10"
                    ariaLabel="Bookmark problem"
                  /> */}
                </div>
              </td>
            </tr>
          ))}
          {problems.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-12 text-[#475569] dark:text-[#94a3b8]">
                No problems match the current filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;
