import { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIconMini,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon
} from '../components/Icons/ProfilePageIcons';
import LoadingPage from './LoadingPage';
import { mapSubmissions } from '../utils/heplerFunctions';
import axiosClient from '../config/axios';
import { NavLink } from 'react-router';

let totalPages, totalSubmissions;

const SubmissionStatusIcon = ({ status }) => {
  switch (status) {
    case 'Accepted':
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case 'Wrong Answer':
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    case 'Time Limit Exceeded':
      return <ClockIconMini className="w-5 h-5 text-yellow-500" />;
    case 'Compilation Error':
      return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
    case 'Runtime Error':
      return <ExclamationCircleIcon className="w-5 h-5 text-purple-500" />;
    case 'Pending':
      return <ClockIconMini className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const AllRecentSubmissionsPage = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const [ submissionsCountDetails, fetchedSubmissions ] = await Promise.all([
          axiosClient(`/submissions/totalCount`),
          axiosClient(`/submissions?page=${currentPage}`)
        ]);
        console.log(submissionsCountDetails.data);
        totalSubmissions = submissionsCountDetails.data.totalSubmissions;
        totalPages = Math.ceil(totalSubmissions/10);

        const mappedSubmissions = mapSubmissions(fetchedSubmissions.data);

        setSubmissions(mappedSubmissions);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);


  const handlePreviousPage = async () => {
    if(currentPage-1 < 1)
      return;
    try {
      const fetchedSubmissions = await axiosClient(`/submissions?page=${currentPage-1}`);

      const mappedSubmissions = mapSubmissions(fetchedSubmissions.data);

      setSubmissions(mappedSubmissions);
      // setLoading(false);
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  };

  const handleNextPage = async () => {
    if(currentPage+1 > totalPages)
        return;
    try {
      const fetchedSubmissions = await axiosClient(`/submissions?page=${currentPage+1}`);

      const mappedSubmissions = mapSubmissions(fetchedSubmissions.data);

      setSubmissions(mappedSubmissions);
      // setLoading(false);
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  };

  const buttonBaseClasses =
    'px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:ring-offset-1 dark:focus:ring-offset-[#242C37]';
  const enabledButtonClasses = `${buttonBaseClasses} bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200`;
  const disabledButtonClasses = `${buttonBaseClasses} bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed`;

  if(loading) return <LoadingPage/>

  return (
    <div className="container mx-auto px-4 sm:px-20 py-8">
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-6">
            { onBack && 
              <button
                onClick={onBack}
                className="mr-2 sm:mr-4 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF7F00]"
                aria-label="Back to profile"
              >
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button> 
            }
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white">
              All Submissions ({totalSubmissions})
            </h2>
          </div>

          {submissions.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">
              No submissions.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-700/100">
                    <tr>
                      {['Problem', 'Status', 'Language', 'Runtime', 'Memory', 'Date'].map((heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
                    {submissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <NavLink to={`/problems/${submission.problemId}`}>
                            <span
                              className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#FF7F00] dark:hover:text-[#FF7F00] transition-colors"
                              role="button"
                              tabIndex={0}
                              aria-label={`View details for submission: ${submission.problemName}`}
                            >
                              {submission.problemName}
                            </span>
                          </NavLink>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <SubmissionStatusIcon status={submission.status} />
                            <span
                              className={`text-sm ${
                                submission.status === 'Accepted'
                                  ? 'text-green-600 dark:text-green-400'
                                  : submission.status === 'Wrong Answer'
                                  ? 'text-red-600 dark:text-red-400'
                                  : submission.status === 'Compilation Error'
                                  ? 'text-red-600 dark:text-orange-400'
                                  : submission.status === 'Time Limit Exceeded'
                                  ? 'text-yellow-600 dark:text-yellow-400'
                                  : submission.status === 'Runtime Error'
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : submission.status === 'Pending'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {submission.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {submission.language}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {submission.runtime || 'N/A'}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {submission.memory || 'N/A'}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(submission.date).toLocaleString()}
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
                    aria-label="Previous page of submissions"
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
                    aria-label="Next page of submissions"
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

export default AllRecentSubmissionsPage;
