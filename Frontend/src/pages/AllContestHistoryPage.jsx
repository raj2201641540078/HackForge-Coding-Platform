import { useState } from 'react';
import { TrophyIcon, ListBulletIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons/ProfilePageIcons';

const ITEMS_PER_PAGE = 10;

const AllContestHistoryPage = ({ contestHistory, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(contestHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentContestEntries = contestHistory.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const buttonBaseClasses =
    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:ring-offset-1 dark:focus:ring-offset-[#242C37]";
  const enabledButtonClasses = `${buttonBaseClasses} bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200`;
  const disabledButtonClasses = `${buttonBaseClasses} bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed`;

  return (
    <div className="container bg-slate-100 dark:bg-gray-900 mx-auto px-4 py-8">
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-2 sm:mr-4 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF7F00]"
              aria-label="Back to profile"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white">
              All Contest History ({contestHistory.length})
            </h2>
          </div>

          {contestHistory.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">
              No contest history available.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-700/100">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Contest Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Problems Solved
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Percentile
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
                    {currentContestEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ListBulletIcon className="w-5 h-5 text-[#FF7F00] mr-2 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                              {entry.contestName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center">
                            <TrophyIcon className="w-4 h-4 text-yellow-500 mr-1.5" />
                            <span>#{entry.rank}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {entry.problemsSolved} / {entry.totalProblems}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {entry.percentile ? `${entry.percentile.toFixed(1)}%` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? disabledButtonClasses : enabledButtonClasses}
                    aria-label="Previous page of contest history"
                  >
                    <ChevronLeftIcon className="w-4 h-4 mr-1 inline" />
                    Previous
                  </button>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? disabledButtonClasses : enabledButtonClasses}
                    aria-label="Next page of contest history"
                  >
                    Next
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllContestHistoryPage;
