import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';

const ContestLeaderboardPage = ({ contest, leaderboard, onBack }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return 'text-[#fbbf24]'; // amber-400
    if (rank === 2) return 'text-[#9ca3af]'; // gray-400
    if (rank === 3) return 'text-[#ca8a04]'; // yellow-600
    return 'text-[#475569] dark:text-[#94a3b8]';
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-semibold text-[#475569] dark:text-[#94a3b8] hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Contest Details</span>
      </button>

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2332] dark:text-[#f1f5f9]">
          Leaderboard
        </h1>
        <p className="mt-3 text-xl text-[#475569] dark:text-[#94a3b8]">{contest.name}</p>
      </div>

      <div className="bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] dark:bg-[#1a2332]">
              <tr className="border-b border-[#e2e8f0] dark:border-[#334155]">
                <th className="p-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8]">
                  Rank
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8]">
                  User
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8] text-center">
                  Score
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8] text-right">
                  Finish Time
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-[#e2e8f0] dark:border-[#334155] last:border-b-0 hover:bg-[#f8fafc]/50 dark:hover:bg-[#1a2332]/50"
                >
                  <td
                    className={`p-4 font-bold text-lg text-center w-24 ${getRankColor(
                      entry.rank
                    )}`}
                  >
                    <div className="flex items-center justify-center">
                      {entry.rank <= 3 && <Trophy size={20} className="mr-2" />}
                      {entry.rank}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold text-[#1a2332] dark:text-[#f1f5f9]">
                        {entry.username}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-center text-[#1a2332] dark:text-[#f1f5f9]">
                    {entry.score} / {contest.problemIds.length}
                  </td>
                  <td className="p-4 font-mono text-right text-[#475569] dark:text-[#94a3b8]">
                    {entry.finishTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestLeaderboardPage;
