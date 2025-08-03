import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Users } from 'lucide-react';

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days > 0 ? `${days}d ` : ''}${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

const ContestCard = ({ contest, onViewContest }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  const { status, startTime, endTime } = contest;

  useEffect(() => {
    if (status === 'ended') {
      setTimeRemaining('');
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime =
        status === 'upcoming'
          ? new Date(startTime).getTime()
          : new Date(endTime).getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeRemaining(formatTime(diff));
      } else {
        setTimeRemaining('');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, startTime, endTime]);

  const statusInfo = useMemo(() => {
    switch (status) {
      case 'live':
        return {
          text: 'Live',
          className:
            'bg-green-500/10 text-green-400 border-green-500/20',
          timerLabel: 'Ends in:',
        };
      case 'upcoming':
        return {
          text: 'Upcoming',
          className:
            'bg-blue-500/10 text-blue-400 border-blue-500/20',
          timerLabel: 'Starts in:',
        };
      case 'ended':
        return {
          text: 'Ended',
          className:
            'bg-gray-500/10 text-gray-400 border-gray-500/20',
          timerLabel: '',
        };
      default:
        return {};
    }
  }, [status]);

  return (
    <div
      onClick={() => onViewContest(contest.id)}
      className="bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-[#1e293b] dark:text-[#e2e8f0]">
            {contest.name}
          </h3>
          <span
            className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.className}`}
          >
            {statusInfo.text}
          </span>
        </div>
        {timeRemaining && (
          <div className="flex items-center space-x-2 text-sm text-[#475569] dark:text-[#94a3b8] mb-4">
            <Clock size={16} />
            <span>{statusInfo.timerLabel}</span>
            <span className="font-mono font-semibold text-[#1e293b] dark:text-[#e2e8f0]">
              {timeRemaining}
            </span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-[#475569] dark:text-[#94a3b8]">
          <Users size={16} />
          <span>{contest.participants.toLocaleString()} Participants</span>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-[#e2e8f0] dark:border-[#334155]">
        <button className="cursor-pointer w-full font-semibold py-2.5 rounded-lg transition-colors text-black dark:text-white bg-[#f0f0f0] dark:bg-[#1a2332] hover:bg-[#e5e7eb] dark:hover:bg-[#334155]">
          View Contest
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
