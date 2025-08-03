import { useState, useMemo, useEffect } from 'react';
import {
  // ChevronUp,
  // ChevronDown,
  Star,
  ChevronLeft,
  ChevronRight,
  Crown,
  Trophy
} from 'lucide-react';
import  { PODIUM_COLORS, DIFFICULTY_COLORS } from '../utils/constants';
import { LoadingPage } from '../pages';
import axiosClient from '../config/axios';
import { mapUserProfile as mapUserInfo, generateMappedLeaderboard } from '../utils/heplerFunctions';


const ProblemDifficulty = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const USERS_PER_PAGE = 10;

let myProfile = {};
let totalPages;

const LeaderboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeaderboardUser, setSelectedLeaderboardUser] = useState(null);
  const [previewDifficultyFilter, setPreviewDifficultyFilter] = useState('All');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {

    const fetchLeaderboardData = async () => {
      try {

        const [leaderboardData, usersCountData]  = await Promise.all([axiosClient.get("/profile/leaderboard"), axiosClient.get("/profile/users-count")]);
        totalPages = Math.ceil(usersCountData.data.totalUsers / USERS_PER_PAGE);
        myProfile = leaderboardData.data.user;
        myProfile.profileImageUrl = myProfile.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg";
        const leaderboard = generateMappedLeaderboard(leaderboardData.data.leaderboard, currentPage);
        setSelectedLeaderboardUser(mapUserInfo(myProfile));
        setLeaderboard(leaderboard);
        setLoading(false);

      } catch (error) {

        console.log(error);

      }
    }
    fetchLeaderboardData();
    
  }, []);

  const filteredPreviewProblems = useMemo(() => {
    if(!selectedLeaderboardUser) return null;
    
    const filteredProblems = [];
    const difficulty = previewDifficultyFilter;

    for(const problem of selectedLeaderboardUser.checkedProblems) {
      if(problem.isSolved) {
        if(difficulty === 'All')
          filteredProblems.push(problem); 
        else if(difficulty === problem.pid.difficulty)
          filteredProblems.push(problem);
      }
    }

    return filteredProblems;

  }, [previewDifficultyFilter, selectedLeaderboardUser])

  const handleNextPageButton = async () => {
    if(currentPage+1>totalPages)
      return;

    try {

        const { data } = await axiosClient.get(`/profile/leaderboard?page=${currentPage + 1}`);
        const leaderboard = generateMappedLeaderboard(data.leaderboard, currentPage+1);
        setCurrentPage(currentPage+1);
        setLeaderboard(leaderboard);

      } catch (error) {

        console.log(error);

      }
  }

  const handlePreviousPageButton = async () => {
    if(currentPage-1<1)
      return;
    
    try {

        const { data } = await axiosClient.get(`/profile/leaderboard?page=${currentPage - 1}`);
        const leaderboard = generateMappedLeaderboard(data.leaderboard, currentPage-1);
        setCurrentPage(currentPage-1);
        setLeaderboard(leaderboard);

      } catch (error) {

        console.log(error);

      }
  }

  const handleUserRowClick = async (user) => {
    if(user.id === selectedLeaderboardUser.id) return;

    if(user.id === myProfile._id) {
      const mappedUserProfile = mapUserInfo(myProfile);
      setSelectedLeaderboardUser(mappedUserProfile);
      return;
    }

    try {

      const {data: userProfile} = await axiosClient.get(`/profile/leaderboard/${user.id}`);
      userProfile.rank = user.rank;
      const mappedUserProfile = mapUserInfo(userProfile);  
      console.log(userProfile)
      setSelectedLeaderboardUser(mappedUserProfile);
      setPreviewDifficultyFilter('All');
    } catch (error) {

      console.log(error);

    }
  };



  const SortableHeader = ({ columnKey, title, className = "", textAlign = 'text-left' }) => (
    <th
      scope="col"
      className={`px-4 py-3 sm:px-6 ${textAlign} text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider transition-colors ${className}`}
      // onClick={() => handleSort(columnKey)}
      aria-sort={sortKey === columnKey ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <div className={`flex items-center ${textAlign === 'text-center' ? 'justify-center' : textAlign === 'text-right' ? 'justify-end' : ''}`}>
        {title}
        {/* {sortKey === columnKey && (
          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1.5 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 ml-1.5 flex-shrink-0" />
        )} */}
      </div>
    </th>
  );
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="px-4 py-4 sm:px-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-700/60">
        <button
          onClick={handlePreviousPageButton}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-60 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-600 flex items-center shadow-sm hover:shadow transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPageButton}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-60 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-600 flex items-center shadow-sm hover:shadow transition-all"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    );
  };

  const getPodiumIconAndColor = (rank) => {
    if (rank === 1) return { icon: <Crown className={`w-5 h-5 mr-1.5 ${PODIUM_COLORS.gold}`} />, colorClass: PODIUM_COLORS.gold };
    if (rank === 2) return { icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.silver}`} />, colorClass: PODIUM_COLORS.silver };
    if (rank === 3) return { icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.bronze}`} />, colorClass: PODIUM_COLORS.bronze };
    return { icon: null, colorClass: 'text-slate-700 dark:text-slate-200' };
  };

  const difficultyButtonClasses = (isActive) => 
    `px-2.5 py-1 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-[#FF7F00] ${
      isActive 
        ? 'bg-[#FF7F00] text-white' 
        : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200'
    }`;

  if(loading) return <LoadingPage />

  return (
    <div className="container mx-auto px-4 sm:px-15 lg:px-20 py-8 bg-[#ffffff] dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Leaderboard Card */}
        <div className="flex-grow lg:w-2/3">
          <div className="bg-[#f8fafc] dark:bg-[#1a2332] shadow-xl rounded-lg flex flex-col">
            
            <header className="px-4 py-5 sm:px-6 border-b border-slate-200 dark:border-slate-700/60 flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white">Leaderboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">See where you stand among the best coders on HackForge.</p>
            </header>

            {myProfile && (
              <div className="p-4 bg-slate-100 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/60 flex-shrink-0">
                <h2 className="text-md font-semibold text-[#FF7F00] mb-2.5">Your Current Standing</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 items-center text-sm">
                  <div className="font-semibold text-slate-700 dark:text-slate-200 flex items-center">
                    <span className="mr-1">Rank:</span>
                    <span className={`text-lg font-bold ${getPodiumIconAndColor(myProfile.rank).colorClass}`}>
                      #{myProfile.rank}
                    </span>
                  </div>
                  <div className="flex items-center col-span-2 sm:col-span-1 min-w-0">
                    <img className="h-9 w-9 rounded-full mr-2.5 border-2 border-[#FF7F00]/70 object-cover" src={myProfile.profileImageUrl} alt={myProfile.username} />
                    <span className="font-medium text-slate-800 dark:text-white truncate">{myProfile.username}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <Star className="w-4 h-4 mr-1.5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                    {myProfile.points?.toLocaleString()} pts
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {myProfile.noSolvedProblems} solved
                  </div>
                </div>
              </div>
            )}
            
            <div className="overflow-y-auto flex-grow relative">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#e2e8f0] dark:divide-[#334155]">
                  <thead className="bg-[#f8fafc] dark:bg-[#1a2332]/50 sticky top-0 z-20 backdrop-blur-sm border-b-2 border-slate-300 dark:border-slate-600">
                    <tr>
                      <SortableHeader columnKey="rank" title="Rank" className="w-20 sm:w-24" textAlign="text-center" />
                      <th scope="col" className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">User</th>
                      <SortableHeader columnKey="codingPoints" title="Coding Points" className="w-32 sm:w-36" textAlign="text-right"/>
                      <SortableHeader columnKey="problemsSolved" title="Problems Solved" className="w-32 sm:w-36" textAlign="text-right"/>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#334155] bg-[#ffffff] dark:bg-[#232b3b]">
                    {leaderboard.map((user) => {
                      const { icon: podiumIcon, colorClass: rankColorClass } = getPodiumIconAndColor(user.rank);
                      return (
                        <tr 
                          key={user.id} 
                          onClick={() => handleUserRowClick(user)}
                          className={`transition-colors ${user.id === myProfile._id ? 'bg-[#FF7F00]/5 dark:bg-[#FF7F00]/10 hover:bg-[#FF7F00]/10 dark:hover:bg-[#FF7F00]/20' : 'bg-[#ffffff] dark:bg-[#232b3b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2332]/50'} border-b border-[#e2e8f0] dark:border-[#334155] last:border-b-0`}
                          aria-current={user.id === myProfile._id ? "page" : undefined}
                          tabIndex={0}
                          onKeyPress={(e) => e.key === 'Enter' && handleUserRowClick(user)}
                        >
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center">
                              {podiumIcon}
                              <span className={`text-sm font-semibold ${rankColorClass}`}>
                                #{user.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-9 w-9 sm:h-10 sm:w-10 rounded-full mr-3 border-2 border-slate-200 dark:border-slate-600 flex-shrink-0 object-cover" src={user.avatarUrl} alt={user.username} />
                              <div>
                                <div className={`cursor-pointer text-sm font-medium truncate max-w-[120px] sm:max-w-[160px] ${selectedLeaderboardUser?.id === user.id && user.id !== myProfile._id ? 'text-orange-500 dark:text-orange-400' : 'text-slate-900 dark:text-white'}`}>{user.username}</div>
                                {user.id === myProfile._id && 
                                  <span className="bg-[#FF7F00] text-white px-1.5 py-0.5 rounded-full text-xs font-semibold ml-0 mt-0.5 inline-block">You</span>
                                }
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-right">
                            <div className="flex items-center justify-end">
                              <Star className="w-4 h-4 mr-1.5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                              {user.codingPoints}
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-right">
                            {user.problemsSolved}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                 {leaderboard.length === 0 && (
                    <p className="text-center py-12 text-slate-500 dark:text-slate-400">The leaderboard is currently empty.</p>
                )}
                {/* {paginatedUsersToDisplay.length === 0 && leaderboard && (
                    <p className="text-center py-12 text-slate-500 dark:text-slate-400">No other users match the current criteria or page.</p>
                )} */}
              </div>
            </div>
            
            <div className="flex-shrink-0">
                {renderPagination()}
            </div>
          </div>
        </div>

        {/* Right Column: User Profile Preview Panel (Sticky) */}
        {selectedLeaderboardUser && (
          <div className="lg:w-1/3">
            <div className="bg-[#f8fafc] dark:bg-[#1a2332] shadow-xl rounded-lg p-5 sticky top-24 overflow-y-auto">
              {(() => {
                const details = selectedLeaderboardUser;
                const { colorClass: userRankColor } = getPodiumIconAndColor(details.rank);
                return (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center pt-2">
                      <img src={details.avatarUrl} alt={details.username} className="w-20 h-20 rounded-full mb-3 border-4 border-[#FF7F00] shadow-md object-cover" />
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white text-center">{details.username}</h3>
                      {selectedLeaderboardUser.id === myProfile._id && 
                        <span className="bg-[#FF7F00]/20 text-[#FF7F00] px-2 py-0.5 rounded-full text-xs font-medium mt-1.5">
                          This is you
                        </span>
                      }
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-slate-100 dark:bg-slate-700/60 p-2.5 rounded-md text-center">
                            <div className="flex items-center justify-center mb-0.5">
                                <Trophy className={`w-4 h-4 mr-1.5 ${userRankColor}`} />
                                <span className="text-xs text-slate-600 dark:text-slate-300">Rank</span>
                            </div>
                            <p className={`font-semibold text-lg ${userRankColor}`}>#{details.rank}</p>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700/60 p-2.5 rounded-md text-center">
                            <div className="flex items-center justify-center mb-0.5">
                                <Star className="w-4 h-4 mr-1.5 text-yellow-500 dark:text-yellow-400" />
                                <span className="text-xs text-slate-600 dark:text-slate-300">Points</span>
                            </div>
                            <p className="font-semibold text-lg text-[#FF7F00]">{details.codingPoints}</p>
                        </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold mb-2 text-slate-700 dark:text-slate-200">Solved Statistics</h4>
                      <div className="text-sm space-y-1.5 p-3.5 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/60 rounded-lg shadow-sm">
                        <div className="flex justify-between"><span>Total Solved:</span> <span className="font-medium">{details.solvedStats.total.toLocaleString()} / {details.solvedStats.totalOverall.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>Easy:</span> <span className="font-medium">{details.solvedStats.easy.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400"> (of {details.solvedStats.totalEasy.toLocaleString()})</span></span></div>
                        <div className="flex justify-between"><span>Medium:</span> <span className="font-medium">{details.solvedStats.medium.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400"> (of {details.solvedStats.totalMedium.toLocaleString()})</span></span></div>
                        <div className="flex justify-between"><span>Hard:</span> <span className="font-medium">{details.solvedStats.hard.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400"> (of {details.solvedStats.totalHard.toLocaleString()})</span></span></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        Recent Solved Problems
                      </h4>
                      <div className="flex space-x-2 mb-3">
                        {['All', ...Object.values(ProblemDifficulty)].map(diff => (
                          <button
                            key={diff}
                            onClick={() => setPreviewDifficultyFilter(diff)}
                            className={difficultyButtonClasses(previewDifficultyFilter === diff)}
                            aria-pressed={previewDifficultyFilter === diff}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                      <div className="max-h-60 overflow-y-auto pr-1 custom-scrollbar"> 
                        {filteredPreviewProblems.length > 0 ? (
                          <ul className="space-y-2.5">
                            {filteredPreviewProblems.map(p => (
                              <li key={p.pid._id} className="text-sm p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-md shadow-sm">
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="font-medium text-slate-800 dark:text-slate-100 truncate pr-2">{p.pid.title}</span>
                                  <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${DIFFICULTY_COLORS[p.pid.difficulty]}`}>
                                    {p.pid.difficulty}
                                  </span>
                                </div>
                                 <div className="text-xs text-slate-500 dark:text-slate-400">Solved: {new Date(p.submitDate).toLocaleDateString()}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-center py-4 text-slate-500 dark:text-slate-400">
                            No {previewDifficultyFilter !== 'All' ? previewDifficultyFilter.toLowerCase() : ''} problems solved recently by this user.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;