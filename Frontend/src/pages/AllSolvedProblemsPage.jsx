import { useState } from 'react';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons/ProfilePageIcons';
import { DIFFICULTY_COLORS } from '../utils/constants';
import { NavLink } from 'react-router';

const ITEMS_PER_PAGE = 10;

const AllSolvedProblemsPage = ({ problems, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProblems = problems.slice(startIndex, endIndex);

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
              All Solved Problems ({problems.length})
            </h2>
          </div>

          {problems.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">
              No problems solved yet. Keep coding!
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-700/100">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Topics
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        Solved On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
                    {currentProblems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <NavLink to={`/problems/${problem.id}`}>
                            <div className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#FF7F00] dark:hover:text-[#FF7F00] transition-colors">
                              {problem.title}
                            </div>
                          </NavLink>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${DIFFICULTY_COLORS[problem.difficulty]}`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
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
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(problem.solvedDate).toLocaleDateString()}
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
                    aria-label="Previous page of solved problems"
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
                    aria-label="Next page of solved problems"
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

export default AllSolvedProblemsPage;
