import { Trophy, Star, Flame, Calendar } from 'lucide-react';
import AdvancedSolvedStatsChart from './AdvancedSolvedStatsChart';

const UserInfoCard = ({ user }) => {

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
      {/* User Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
        {/* Avatar */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start relative">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-28 h-28 rounded-full border-2 border-[#FF7F00] shadow-md object-cover"
          />
          {/* Divider */}
          <div className="hidden sm:block absolute top-0 -right-4 h-full w-px bg-slate-200 dark:bg-slate-600"></div>
        </div>

        {/* User Details */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
          {/* Main Name Info */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white break-all">
              {user.username}
            </h2>
            {user.fullName && (
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 break-all">
                {user.fullName}
              </h3>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-col items-center sm:items-start bg-slate-50 dark:bg-slate-700/50 rounded-md px-3 py-2 space-y-1 w-fit">
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium mr-1">📧</span>
              <span className="break-all">{user.email}</span>
            </div>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span>Joined on {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking & Points */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-200">Ranking, Points & Connections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-0.5">
              <Trophy className="w-4 h-4 mr-1.5 text-yellow-500 dark:text-yellow-400" />
              <p className="text-sm text-slate-600 dark:text-slate-300">Rank</p>
            </div>
            <p className="font-semibold text-xl text-[#FF7F00]">{user.rank}</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-0.5">
              <Star className="w-4 h-4 mr-1.5 text-yellow-400 dark:text-yellow-300" />
              <p className="text-sm text-slate-600 dark:text-slate-300">Coding Points</p>
            </div>
            <p className="font-semibold text-xl text-[#FF7F00]">{user.codingPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Streaks */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-200">Streaks</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md">
            <div className="flex items-center justify-center text-[#FF7F00]">
              <Flame className="w-6 h-6 mr-2" />
              <p className="text-2xl font-bold">{user.streaks.current}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Streak</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md">
            <div className="flex items-center justify-center text-[#FF7F00]">
              <Flame className="w-6 h-6 mr-2" />
              <p className="text-2xl font-bold">{user.streaks.longest}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Longest Streak</p>
          </div>
        </div>
      </div>

      {/* Problems Solved */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">Problems Solved</h3>
        <AdvancedSolvedStatsChart solvedStats={user.solvedStats} />
      </div>

      {/* Achievements */}
      { user.streaks.longest>10 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-200">Achievements</h3>
          <div className="space-y-3">
              <div className="flex items-center bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md shadow-sm">
                <Trophy size={20} className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Streak Breaker</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{`${user.streaks.longest} days of consistent efforts`}</p>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Skill Breakdown Placeholder */}
      {/* <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-200">Skill Breakdown</h3>
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-md text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Detailed skill analysis and topic proficiency will be shown here. (e.g., Arrays, Dynamic Programming, Graphs)
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default UserInfoCard;
