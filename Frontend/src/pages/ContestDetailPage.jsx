import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Clock, Users, Award, FileText, ListChecks, Trophy } from 'lucide-react';

const getContestStatus = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (now < start) return 'upcoming';
  if (now >= start && now <= end) return 'live';
  return 'ended';
};

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

const ContestDetailPage = ({ contest, onBack, onJoin, onViewLeaderboard }) => {
  const status = getContestStatus(contest.startTime, contest.endTime);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const targetTime =
      status === 'upcoming'
        ? new Date(contest.startTime).getTime()
        : new Date(contest.endTime).getTime();
    const interval = setInterval(() => {
      const diff = targetTime - new Date().getTime();
      if (diff > 0) {
        setTimeRemaining(diff);
      } else {
        setTimeRemaining(0);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [status, contest.startTime, contest.endTime]);

  const ActionButton = () => {
    switch (status) {
      case 'live':
        return (
          <button
            onClick={() => onJoin(contest.id)}
            className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-colors"
          >
            Join Contest
          </button>
        );
      case 'upcoming':
        return (
          <button className="w-full sm:w-auto bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-600 transition-colors">
            Register Now
          </button>
        );
      case 'ended':
        return (
          <button
            onClick={() => onViewLeaderboard(contest.id)}
            className="w-full sm:w-auto bg-[#f97316] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <Trophy size={20} />
            <span>View Leaderboard</span>
          </button>
        );
      default:
        return null;
    }
  };

  const InfoCard = ({ icon, title, value }) => (
    <div className="bg-[#f8fafc] dark:bg-[#1a2332] p-4 rounded-lg flex items-center space-x-4">
      <div className="text-[#f97316]">{icon}</div>
      <div>
        <p className="text-sm text-[#475569] dark:text-[#94a3b8]">{title}</p>
        <p className="font-bold text-[#1a2332] dark:text-[#f1f5f9]">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-semibold text-[#475569] dark:text-[#94a3b8] hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Contests</span>
      </button>

      <header className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2332] dark:text-[#f1f5f9]">
            {contest.name}
          </h1>
          <ActionButton />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard
            icon={<Clock size={24} />}
            title={status === 'upcoming' ? 'Starts In' : 'Time Remaining'}
            value={status === 'ended' ? 'Finished' : formatTime(timeRemaining)}
          />
          <InfoCard
            icon={<Users size={24} />}
            title="Participants"
            value={contest.participants.toLocaleString()}
          />
          <InfoCard
            icon={<FileText size={24} />}
            title="Problems"
            value={String(contest.problemIds.length)}
          />
          <InfoCard
            icon={<Award size={24} />}
            title="Top Prize"
            value={contest.prizes[0] || 'Bragging rights'}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#ffffff] dark:bg-[#232b3b] p-6 rounded-xl border border-[#e2e8f0] dark:border-[#334155]">
            <h2 className="text-2xl font-bold mb-4 text-[#1a2332] dark:text-[#f1f5f9]">
              Description
            </h2>
            <p className="text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              {contest.description}
            </p>
          </section>

          <section className="bg-[#ffffff] dark:bg-[#232b3b] p-6 rounded-xl border border-[#e2e8f0] dark:border-[#334155]">
            <h2 className="text-2xl font-bold mb-4 text-[#1a2332] dark:text-[#f1f5f9]">
              Problems
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] dark:border-[#334155]">
                    <th className="py-3 px-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8]">
                      #
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8]">
                      Title
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase text-[#475569] dark:text-[#94a3b8]">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contest.problems.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#e2e8f0] dark:border-[#334155] last:border-b-0"
                    >
                      <td className="py-3 px-4 font-medium text-[#1a2332] dark:text-[#f1f5f9]">
                        {String.fromCharCode(65 + i)}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#1a2332] dark:text-[#f1f5f9]">
                        {p.title}
                      </td>
                      <td className="py-3 px-4 text-[#475569] dark:text-[#94a3b8]">
                        {p.difficulty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-[#ffffff] dark:bg-[#232b3b] p-6 rounded-xl border border-[#e2e8f0] dark:border-[#334155]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#1a2332] dark:text-[#f1f5f9]">
              <ListChecks size={24} /> Rules
            </h2>
            <ul className="space-y-2 text-[#475569] dark:text-[#94a3b8] list-disc list-inside">
              {contest.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <section className="bg-[#ffffff] dark:bg-[#232b3b] p-6 rounded-xl border border-[#e2e8f0] dark:border-[#334155]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#1a2332] dark:text-[#f1f5f9]">
              <Trophy size={24} /> Prizes
            </h2>
            <ul className="space-y-2 text-[#475569] dark:text-[#94a3b8] list-disc list-inside">
              {contest.prizes.map((prize) => (
                <li key={prize}>{prize}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailPage;
