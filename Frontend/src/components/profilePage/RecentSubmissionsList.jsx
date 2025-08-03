import { CheckCircleIcon, XCircleIcon, ClockIconMini, ExclamationCircleIcon, ExclamationTriangleIcon } from '../Icons/ProfilePageIcons';
import { NavLink } from 'react-router';

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

const RecentSubmissionsList = ({ submissions, onViewAll }) => {
  if (submissions.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400 text-center py-8">
        No recent submissions.
      </p>
    );
  }

  const submissionsToShow = submissions.slice(0, 10);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-700/100">
            <tr>
              {['Problem', 'Status', 'Language', 'Runtime', 'Memory', 'Date'].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-slate-200 dark:divide-slate-700">
            {submissionsToShow.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <NavLink to={`/problems/${submission.problemId}`}>
                    <div className="text-sm font-medium text-slate-900 dark:text-white hover:text-[#FF7F00] dark:hover:text-[#FF7F00] transition-colors">
                      {submission.problemName}
                    </div>
                  </NavLink>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {submission.language}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {submission.runtime || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {submission.memory || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {new Date(submission.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length >= 10 && onViewAll && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewAll}
            className="px-4 py-2 text-sm font-medium rounded-md text-[#FF7F00] hover:bg-[#FF7F00]/10 focus:outline-none focus:ring-2 focus:ring-[#FF7F00] focus:ring-offset-2 dark:focus:ring-offset-[#242C37] transition-colors"
            aria-label="View all recent submissions"
          >
            View All Recent Submissions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentSubmissionsList;
