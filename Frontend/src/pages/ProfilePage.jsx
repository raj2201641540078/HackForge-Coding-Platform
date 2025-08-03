import { useState, useEffect } from 'react';
import {   
    UserInfoCard,
    DailySubmissionsChart,
    MonthlySubmissionsLineChart,
    ProblemSubmissionTabs,
    YearlyActivityHeatMap,
    AllContestHistoryPage,
    AllRecentSubmissionsPage,
    AllSolvedProblemsPage,
} from "../components";
import LoadingPage from './LoadingPage';
import axiosClient from '../config/axios';
import { 
  filterSubmissionsByDateRange, 
  filterProblemsByDateRange, 
  summarizeSubmissionsByDate, 
  compareDates, 
  getPreviousDate,
  getStartAndLastDate, 
  getTotalDailyActivityPages, 
  filterByKey, 
  mapSubmissions, 
  mapUserInfo, 
  mapSolvedProblems 
} from '../utils/heplerFunctions';

// Mock Data
// const mockUser = {
//   id: 'user123',
//   username: 'CodeNinja',
//   email: 'codeninja@example.com',
//   avatarUrl: 'https://picsum.photos/seed/codeninja/100/100',
//   joinDate: '2023-01-15T10:00:00Z',
//   rank: '#1234',
//   codingPoints: 7500,
//   connectionsCount: 152,
//   solvedStats: {
//     easy: 50, totalEasy: 120, medium: 30, totalMedium: 180, hard: 10, totalHard: 90,
//     total: 90, totalOverall: 390,
//   },
//   streaks: { current: 12, longest: 45 },
//   achievements: [
//     { id: 'ach1', name: 'Century Solver', description: 'Solved 100 problems.', dateAwarded: '2024-06-15T00:00:00Z', icon: 'TrophyIcon' },
//     { id: 'ach2', name: 'Easy Peasy Expert', description: 'Mastered 50 easy problems.', dateAwarded: '2024-05-20T00:00:00Z', icon: 'TrophyIcon' },
//     { id: 'ach3', name: 'Streak Starter', description: 'Maintained a 10-day solving streak.', dateAwarded: '2024-03-01T00:00:00Z', icon: 'FireIcon' },
//   ],
//   skills: [
//     { topic: 'Arrays', proficiency: 0.8, problemsSolved: 20, totalProblems: 25 },
//     { topic: 'Dynamic Programming', proficiency: 0.6, problemsSolved: 10, totalProblems: 18 },
//   ]
// };

// const ProblemDifficulty = {
//   Easy: 'Easy',
//   Medium: 'Medium',
//   Hard: 'Hard',
// };

const mockContestHistory = Array.from({ length: 0 }, (_, i) => ({
  id: `c${i + 1}`,
  contestName: `Contest Name ${i + 1}`,
  date: new Date(2024, 5 - Math.floor(i / 2), 15 - (i % 2) * 14).toISOString(),
  rank: 100 + i * 10,
  problemsSolved: 4 - i % 3,
  totalProblems: 4,
  percentile: 90 - i * 2.5,
}));


const availableYearsForHeatmap = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];
let totalPagesFor14DaysInterval, totalPagesFor30DaysInterval;
let userDailyProblemsData;
let yearlyActivity;
let currentDailyActivityData, totalSubmissionsForDailyPeriod;
let currentMonthlyActivity, totalSubmissionsForMonthlyPeriod;
let yearlyHeatmapData;

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [submissionsTrendFilter, setSubmissionsTrendFilter] = useState("acceptedCount");
  const contestHistory = mockContestHistory;

  const [detailedView, setDetailedView] = useState(null);
  const [dailyActivityOffsetBlocks, setDailyActivityOffsetBlocks] = useState(1);
  const [monthlyActivityOffset, setMonthlyActivityOffset] = useState(1);
  const [heatmapYear, setHeatmapYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {

        const [userInfo, yearlyActivityInfo ] = await Promise.all([
          axiosClient.get("/profile/@me"),
          axiosClient.get("/profile/get-yearly-activity")
        ]);

        const userData = userInfo.data;
        yearlyActivity = yearlyActivityInfo.data;
        userDailyProblemsData = summarizeSubmissionsByDate(userData.checkedProblems);
        totalPagesFor14DaysInterval = getTotalDailyActivityPages(userData.createdAt, 14);
        totalPagesFor30DaysInterval = getTotalDailyActivityPages(userData.createdAt, 30);

        let { startDate: startDate14, lastDate: lastDate14 } = getStartAndLastDate(1, 14);
        const userJoinedDate = userData.createdAt.split('T')[0];

        if(compareDates(startDate14, userJoinedDate) < 0) 
          startDate14 = userJoinedDate;

        currentDailyActivityData = filterProblemsByDateRange(userDailyProblemsData, startDate14, lastDate14);
        totalSubmissionsForDailyPeriod = currentDailyActivityData.reduce((sum, item) => sum + item.count, 0);

        let { startDate: startDate30, lastDate: lastDate30 } = getStartAndLastDate(1, 30);

        if(compareDates(startDate30, userJoinedDate) < 0) 
          startDate30 = userJoinedDate;

        currentMonthlyActivity = filterByKey(filterSubmissionsByDateRange(yearlyActivity.yearlyActivity, startDate30, lastDate30), submissionsTrendFilter);
        totalSubmissionsForMonthlyPeriod = currentMonthlyActivity.reduce((sum, item) => sum + item.count, 0);
        yearlyHeatmapData = filterSubmissionsByDateRange(yearlyActivity.yearlyActivity, yearlyActivity.startDate, getPreviousDate(yearlyActivity.endDate));

        const userProfile = mapUserInfo(userData);
        const solvedProblems = mapSolvedProblems(userData.checkedProblems);
        const submissions = mapSubmissions(userData.submissions);
        setUser(userProfile);
        setSolvedProblems(solvedProblems);
        setSubmissions(submissions);
        setLoading(false);

      } catch(error) {
        console.log(error.message);
      }
    }
    fetchUserInfo();

  }, []);

  const handlePrevious14Days = () => {
    if(dailyActivityOffsetBlocks+1>totalPagesFor14DaysInterval)
      return

    let { startDate: startDate14, lastDate: lastDate14 } = getStartAndLastDate(dailyActivityOffsetBlocks + 1, 14);
    const userJoinedDate = user.joinDate.split('T')[0];

    if(compareDates(startDate14, userJoinedDate) < 0) 
      startDate14 = userJoinedDate;

    currentDailyActivityData = filterProblemsByDateRange(userDailyProblemsData, startDate14, lastDate14);
    totalSubmissionsForDailyPeriod = currentDailyActivityData.reduce((sum, item) => sum + item.count, 0);
    setDailyActivityOffsetBlocks(prev => prev + 1);
  } 
  
  const handleNext14Days = () => {
    if(dailyActivityOffsetBlocks-1<1)
      return

    let { startDate: startDate14, lastDate: lastDate14 } = getStartAndLastDate(dailyActivityOffsetBlocks - 1, 14);
    const userJoinedDate = user.joinDate.split('T')[0];

    if(compareDates(startDate14, userJoinedDate) < 0) 
      startDate14 = userJoinedDate;

    currentDailyActivityData = filterProblemsByDateRange(userDailyProblemsData, startDate14, lastDate14);
    totalSubmissionsForDailyPeriod = currentDailyActivityData.reduce((sum, item) => sum + item.count, 0);
    setDailyActivityOffsetBlocks(prev => prev - 1);
  } 

  const handlePrevious30Days = () => {
    if(monthlyActivityOffset+1>totalPagesFor30DaysInterval)
      return

    let { startDate: startDate30, lastDate: lastDate30 } = getStartAndLastDate(monthlyActivityOffset + 1, 30);
    const userJoinedDate = user.joinDate.split('T')[0];

    if(compareDates(startDate30, userJoinedDate) < 0) 
      startDate30 = userJoinedDate;

    currentMonthlyActivity = filterByKey(filterSubmissionsByDateRange(yearlyActivity.yearlyActivity, startDate30, lastDate30), submissionsTrendFilter);
    totalSubmissionsForMonthlyPeriod = currentMonthlyActivity.reduce((sum, item) => sum + item.count, 0);

    setMonthlyActivityOffset(prev => prev + 1);
  }

  const handleNext30Days = () => {
    if(monthlyActivityOffset-1<1)
      return

    let { startDate: startDate30, lastDate: lastDate30 } = getStartAndLastDate(monthlyActivityOffset - 1, 30);
    const userJoinedDate = user.joinDate.split('T')[0];

    if(compareDates(startDate30, userJoinedDate) < 0) 
      startDate30 = userJoinedDate;
    
    currentMonthlyActivity = filterByKey(filterSubmissionsByDateRange(yearlyActivity.yearlyActivity, startDate30, lastDate30), submissionsTrendFilter);
    totalSubmissionsForMonthlyPeriod = currentMonthlyActivity.reduce((sum, item) => sum + item.count, 0);

    setMonthlyActivityOffset(prev => prev - 1);
  }

  const handleHeatmapYearChange = async (newYear) => {
    try {
      const currentYear = new Date().getUTCFullYear();
      const yearlyActivity = await axiosClient.get(`/profile/get-yearly-activity?page=${currentYear-newYear+1}`);
      yearlyHeatmapData = filterSubmissionsByDateRange(yearlyActivity.data.yearlyActivity, yearlyActivity.data.startDate, getPreviousDate(yearlyActivity.data.endDate));
      setHeatmapYear(newYear);
    } catch (error) {
      console.log(error);
    }
  }

  const buttonBaseClasses = "px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F00]";
  const enabledButtonClasses = `${buttonBaseClasses} bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200`;
  const disabledButtonClasses = `${buttonBaseClasses} bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed`;

  if(loading) return <LoadingPage/>

  if (detailedView) {
    return (
      <>
        {detailedView === 'solved' && <AllSolvedProblemsPage onBack={() => setDetailedView(null)} />}
        {detailedView === 'submissions' && <AllRecentSubmissionsPage onBack={() => setDetailedView(null)} />}
        {detailedView === 'contests' && <AllContestHistoryPage contestHistory={contestHistory} onBack={() => setDetailedView(null)} />}
      </>
    );
  }

  return (
  <div className="containe dark:bg-gray-900 mx-auto px-4 sm:px-10 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <UserInfoCard user={user} />
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Recent Activity</h3>
              <p className="text-sm text-[#FF7F00] font-semibold">
                Total for period: {totalSubmissionsForDailyPeriod}
              </p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={handlePrevious14Days} 
                disabled={dailyActivityOffsetBlocks === totalPagesFor14DaysInterval} 
                className={dailyActivityOffsetBlocks === totalPagesFor14DaysInterval ? disabledButtonClasses : enabledButtonClasses}
              >
                &larr; Previous
              </button>
              <button
                onClick={handleNext14Days}
                disabled={dailyActivityOffsetBlocks === 1}
                className={
                  dailyActivityOffsetBlocks === 1 ? disabledButtonClasses : enabledButtonClasses
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
          <DailySubmissionsChart activity={currentDailyActivityData} />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Recent Accepted Submissions Trend
              </h3>
              <p className="text-sm text-[#FF7F00] font-semibold">
                Total for period: {totalSubmissionsForMonthlyPeriod}
              </p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={handlePrevious30Days} 
                disabled={monthlyActivityOffset === totalPagesFor30DaysInterval} 
                className={monthlyActivityOffset === totalPagesFor30DaysInterval ? disabledButtonClasses : enabledButtonClasses}
              >
                &larr; Previous
              </button>
              <button
                onClick={handleNext30Days}
                disabled={monthlyActivityOffset === 1}
                className={
                  monthlyActivityOffset === 1 ? disabledButtonClasses : enabledButtonClasses
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
          <MonthlySubmissionsLineChart activity={currentMonthlyActivity} />
        </div>

        <YearlyActivityHeatMap
          year={heatmapYear}
          activityData={yearlyHeatmapData}
          onYearChange={handleHeatmapYearChange}
          availableYears={availableYearsForHeatmap}
        />

        <ProblemSubmissionTabs
          solvedProblems={solvedProblems}
          recentSubmissions={submissions}
          contestHistory={contestHistory}
          onViewAllSolved={() => setDetailedView('solved')}
          onViewAllSubmissions={() => setDetailedView('submissions')}
          onViewAllContests={() => setDetailedView('contests')}
        />
      </div>
    </div>
  </div>

  );
};

export default ProfilePage;