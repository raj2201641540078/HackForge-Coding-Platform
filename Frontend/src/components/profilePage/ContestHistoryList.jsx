import { TrophyIcon, ListBulletIcon } from '../Icons/ProfilePageIcons';

const ContestHistoryList = ({ contestHistory, onViewAll }) => {
  if (contestHistory.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400 text-center py-8">
        No contest history available.
      </p>
    );
  }

  const contestHistoryToShow = contestHistory.slice(0, 10);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-700/100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                Contest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                Problems Solved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                Percentile
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
            {contestHistoryToShow.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ListBulletIcon className="w-5 h-5 text-[#FF7F00] mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {entry.contestName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <TrophyIcon className="w-4 h-4 text-yellow-500 mr-1.5" />
                    <span>#{entry.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {entry.problemsSolved} / {entry.totalProblems}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {entry.percentile ? `${entry.percentile.toFixed(1)}%` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contestHistory.length > 10 && onViewAll && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-[#FF7F00] hover:bg-[#FF7F00]/10 focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:ring-offset-2 dark:focus:ring-offset-[#242C37] transition-colors"
            aria-label="View all contest history"
          >
            View All Contest History
          </button>
        </div>
      )}
    </div>
  );
};

export default ContestHistoryList;
