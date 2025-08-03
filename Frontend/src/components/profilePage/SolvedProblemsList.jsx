import { CheckCircleIcon } from '../Icons/ProfilePageIcons';
import { DIFFICULTY_COLORS } from '../../utils/constants';
import { NavLink } from 'react-router';

const SolvedProblemsList = ({ problems, onViewAll }) => {
  if (problems.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400 text-center py-8">
        No problems solved yet. Keep coding!
      </p>
    );
  }

  const problemsToShow = problems.slice(0, 10);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-700/100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                Difficulty
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                Topics
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
              >
                Solved On
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
            {problemsToShow.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <NavLink to={`/problems/${problem.id}`}>
                    <div className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#FF7F00] dark:hover:text-[#FF7F00] transition-colors">
                      {problem.title}
                    </div>
                  </NavLink>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${DIFFICULTY_COLORS[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex flex-wrap gap-1">
                    {problem.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {new Date(problem.solvedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {problems.length >= 10 && onViewAll && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-[#FF7F00] hover:bg-[#FF7F00]/10 focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:ring-offset-2 dark:focus:ring-offset-[#242C37] transition-colors"
            aria-label="View all solved problems"
          >
            View All Solved Problems
          </button>
        </div>
      )}
    </div>
  );
};

export default SolvedProblemsList;
