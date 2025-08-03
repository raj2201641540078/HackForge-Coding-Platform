import { useState } from 'react';
import SolvedProblemsList from './SolvedProblemsList';
import RecentSubmissionsList from './RecentSubmissionsList';
import ContestHistoryList from './ContestHistoryList';

const ProblemSubmissionTabs = ({
  solvedProblems,
  recentSubmissions,
  contestHistory,
  onViewAllSolved,
  onViewAllSubmissions,
  onViewAllContests
}) => {
  const [activeTab, setActiveTab] = useState('solved');

  const tabButtonClasses = (tabName) =>
    `px-4 py-2 font-medium text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F00] ${
      activeTab === tabName
        ? 'bg-[#FF7F00] text-white'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-2" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('solved')}
            className={tabButtonClasses('solved')}
            aria-current={activeTab === 'solved' ? 'page' : undefined}
          >
            Solved Problems ({solvedProblems.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={tabButtonClasses('submissions')}
            aria-current={activeTab === 'submissions' ? 'page' : undefined}
          >
            Recent Submissions ({recentSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('contests')}
            className={tabButtonClasses('contests')}
            aria-current={activeTab === 'contests' ? 'page' : undefined}
          >
            Contest History ({contestHistory.length})
          </button>
        </nav>
      </div>
      <div className="p-0 sm:p-2 md:p-4">
        {activeTab === 'solved' && (
          <SolvedProblemsList problems={solvedProblems} onViewAll={onViewAllSolved} />
        )}
        {activeTab === 'submissions' && (
          <RecentSubmissionsList submissions={recentSubmissions} onViewAll={onViewAllSubmissions} />
        )}
        {activeTab === 'contests' && (
          <ContestHistoryList contestHistory={contestHistory} onViewAll={onViewAllContests} />
        )}
      </div>
    </div>
  );
};

export default ProblemSubmissionTabs;
