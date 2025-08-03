import React, { useMemo } from 'react';
import { ContestCard } from '../components';
import { Trophy } from 'lucide-react';

const now = new Date();
export const ALL_CONTESTS = [
    // {
    //     id: 'c1',
    //     name: 'Weekly Contest #345',
    //     startTime: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    //     endTime: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(),
    //     participants: 1284,
    //     description: 'A weekly contest featuring one easy, two medium, and one hard problem. Challenge yourself and see where you stand!',
    //     rules: ['Contest duration is 90 minutes.', 'Penalties are applied for incorrect submissions.', 'Solutions must be submitted in C++, Java, or Python.'],
    //     prizes: ['1st Place: HackForge T-Shirt', 'Top 10: 1000 HackForge Coins', 'Top 100: 100 HackForge Coins'],
    //     problemIds: ['p9', 'p6', 'p5', 'p7']
    // },
    {
        id: 'c2',
        name: 'Biweekly Contest #102',
        startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000)).toISOString(),
        participants: 0,
        description: 'Our biweekly contest for all skill levels. A great way to practice under pressure.',
        rules: ['Contest duration is 120 minutes.', 'No penalties for incorrect submissions.'],
        prizes: ['Top 20: 500 HackForge Coins'],
        problemIds: ['p1', 'p4', 'p2']
    },
    // {
    //     id: 'c4',
    //     name: 'Data Structures Challenge',
    //     startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    //     endTime: new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000)).toISOString(),
    //     participants: 892,
    //     description: 'A special contest focusing on fundamental and advanced data structures.',
    //     rules: ['Contest duration is 2 hours.', 'Submissions are judged on correctness and efficiency.'],
    //     prizes: ['1st Place: Premium Subscription (1 Year)', 'Top 50: 250 HackForge Coins'],
    //     problemIds: ['p4', 'p10', 'p8']
    // },
    // {
    //     id: 'c5',
    //     name: 'Algorithm Avengers #4',
    //     startTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    //     endTime: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000) + (2.5 * 60 * 60 * 1000)).toISOString(),
    //     participants: 2145,
    //     description: 'The ultimate algorithm showdown. Prepare for a mix of dynamic programming, graphs, and more.',
    //     rules: ['Contest duration is 2.5 hours.', 'Plagiarism will result in a permanent ban.'],
    //     prizes: ['1st Place: Mechanical Keyboard', '2nd Place: $100 Amazon Voucher', '3rd Place: $50 Amazon Voucher'],
    //     problemIds: ['p1', 'p5', 'p3', 'p8']
    // },
];

// helper function
const getContestStatus = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    return 'upcoming';
  } else if (now >= start && now <= end) {
    return 'live';
  } else {
    return 'ended';
  }
};

const ContestsPage = () => {
  const contestsWithStatus = useMemo(() => {
    return ALL_CONTESTS.map((contest) => ({
      ...contest,
      status: getContestStatus(contest.startTime, contest.endTime),
    })).sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, []);

  const liveAndUpcomingContests = contestsWithStatus.filter(
    (c) => c.status === 'live' || c.status === 'upcoming'
  );
  const pastContests = contestsWithStatus
    .filter((c) => c.status === 'ended')
    .reverse();

  const onViewContest = () => {
    alert("You can view contest details after 2 days.")
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 pt-12 pb-30'>
      <div className="text-center mb-12">
        <Trophy className="mx-auto h-12 w-12 text-[#f97316] mb-4" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
          Coding Contests
        </h1>
        <p className="mt-4 text-lg text-[#475569] dark:text-[#94a3b8] max-w-2xl mx-auto">
          Test your skills, compete with others, and win exciting prizes.
        </p>
      </div>

      <div className="space-y-12">
        {/* Live & Upcoming section */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] dark:text-[#e2e8f0] mb-6 pb-3 border-b-2 border-[#f97316]">
            Live & Upcoming
          </h2>
          {liveAndUpcomingContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveAndUpcomingContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onViewContest={onViewContest}
                />
              ))}
            </div>
          ) : (
            <p className="text-[#475569] dark:text-[#94a3b8]">
              No live or upcoming contests right now. Check back soon!
            </p>
          )}
        </section>

        {/* Past Contests section */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] dark:text-[#e2e8f0] mb-6 pb-3 border-b border-[#e2e8f0] dark:border-[#334155]">
            Past Contests
          </h2>
          {pastContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onViewContest={onViewContest}
                />
              ))}
            </div>
          ) : (
            <p className="text-[#475569] dark:text-[#94a3b8]">
              No past contests available.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ContestsPage;
