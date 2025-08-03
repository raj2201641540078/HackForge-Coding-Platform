import { useState, useCallback, useEffect, useRef } from 'react';
import { LeftPanel, RightPanel, ProblemSidebar, Timer as TimerComponent } from "../components";
import axiosClient from '../config/axios';
import { useParams, useNavigate, useOutletContext } from "react-router";
import { ListIcon } from '../components/Icons/SolveProblemPageIcons'; 
import { LoadingPage } from "../pages";
import { Maximize2, Minimize2, Moon, Sun, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { getRoutes } from '../utils/heplerFunctions';

const commonIconButtonClass =
  "p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100";
const profileDropdownSection = [
  { label: 'Home', key: 'home' },
  { label: 'Problems', key: 'problems' },
  { label: 'My Profile', key: 'profile' },
  { label: 'My Submissions', key: 'submissions' },
  {label: 'My Problems', key: 'myProblems' },
  {label: 'My Sprints', key: 'mySprints' },
  { label: 'Account', key: 'account' },
];

const SolveProblemPage = ({ darkTheme, handleThemeChange }) => {
  const { problemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showSubmissionResult, setShowSubmissionResult] = useState(false);
  const [code, setCode] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isProblemLiked, setIsProblemLiked] = useState(false);
  const [isProblemFavourite, setIsProblemFavourite] = useState(false);
  const [isProblemBookmarked, setIsProblemBookmarked] = useState(false);
  const { problems, setProblems } = useOutletContext();
  const [bookmarks, setBookmarks] = useState([]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { user } = useSelector(state => state.authSlice);
  const navigate = useNavigate();

  // --- Start of Resizing Logic ---
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth * 0.5;
    }
    return 500;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isProblemSidebarOpen, setIsProblemSidebarOpen] = useState(false);

  const problemPageRef = useRef(null);

  const minLeftPanelWidth = 200;
  const minRightPanelWidth = 200;
  const dividerActualWidth = 3;

  const handleMouseDownOnDivider = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!isResizing || !problemPageRef.current) return;

    const problemPageRect = problemPageRef.current.getBoundingClientRect();
    let newLeftPanelWidth = event.clientX - problemPageRect.left;

    const totalWidth = problemPageRect.width;
    const maxLeftPanelWidth = totalWidth - minRightPanelWidth - dividerActualWidth;

    if (newLeftPanelWidth < minLeftPanelWidth) {
      newLeftPanelWidth = minLeftPanelWidth;
    } else if (newLeftPanelWidth > maxLeftPanelWidth) {
      newLeftPanelWidth = maxLeftPanelWidth;
    }
    setLeftPanelWidth(newLeftPanelWidth);
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (!isResizing && typeof window !== 'undefined' && problemPageRef.current) {
        const currentPercentage = leftPanelWidth / problemPageRef.current.getBoundingClientRect().width;
        let newWidth = window.innerWidth * currentPercentage;

        const totalWidth = window.innerWidth;
        const maxLeftPanelWidth = totalWidth - minRightPanelWidth - dividerActualWidth;

        if (newWidth < minLeftPanelWidth) newWidth = minLeftPanelWidth;
        if (newWidth > maxLeftPanelWidth) newWidth = maxLeftPanelWidth;

        setLeftPanelWidth(newWidth);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [isResizing, leftPanelWidth]);

  const handleKeyDownOnDivider = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setLeftPanelWidth(w => Math.max(minLeftPanelWidth, w - 10));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const totalWidth = problemPageRef.current
        ? problemPageRef.current.getBoundingClientRect().width
        : window.innerWidth;
      const maxLeftPanelWidth = totalWidth - minRightPanelWidth - dividerActualWidth;
      setLeftPanelWidth(w => Math.min(maxLeftPanelWidth, w + 10));
    }
  };
  // --- End of Resizing Logic ---

  const toggleProblemSidebar = useCallback(() => {
    setIsProblemSidebarOpen(prev => !prev);
  }, []);

  // fullscreen functionality
  const enterFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    setIsFullScreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setIsFullScreen(false);
  }, []);

  useEffect(() => {
    if(showSubmissionResult)
      setShowSubmissionResult(false);
    if(isProblemSidebarOpen)
      setIsProblemSidebarOpen(false);
    setLoading(true);
    const fetchProblemDetails = async () => {
      try {
        const [problemRes, userData] = await Promise.all([
          axiosClient.get(`/problems/${problemId}`),
          axiosClient.get(`/problems/${problemId}/user-data`),
        ]);
        setProblem(problemRes.data);
        setIsProblemLiked(userData.data.liked);
        setIsProblemFavourite(userData.data.favourite);
        setBookmarks(userData.data.bookmarks);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProblemDetails();
  }, [problemId]);

  const handleLikeButton = async () => {
    try {
      if (isProblemLiked) {
        await axiosClient.delete(`/problems/${problemId}/like`);
        problem.likes--;
        setIsProblemLiked(false);
        setProblem({ ...problem });
      } else {
        await axiosClient.post(`/problems/${problemId}/like`);
        problem.likes++;
        setIsProblemLiked(true);
        setProblem({ ...problem });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavouriteButton = async () => {
    try {
      if (isProblemFavourite) {
        await axiosClient.delete(`/problems/${problemId}/favourite`);
        setIsProblemFavourite(false);
        toast.success('Removed from favourites');
      } else {
        await axiosClient.post(`/problems/${problemId}/favourite`);
        setIsProblemFavourite(true);
        toast.success('Added to favourites');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  const handleProfileItemClick = (action) => {
    navigate(getRoutes(action));
    setIsProfileDropdownOpen(false);
  };

  if (loading) return <LoadingPage />;

  return (
    <main className="flex flex-col h-screen w-screen">
      <ProblemSidebar problems={problems} currentProblemId={problemId} isOpen={isProblemSidebarOpen} onClose={toggleProblemSidebar} />

      {/* Top Bar */}
      <div className="flex items-center justify-between p-2.5 bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleProblemSidebar}
            className={commonIconButtonClass}
            aria-label="Problem List"
          >
            <ListIcon />
          </button>
          <span className="text-sm">Problem List</span>
        </div>
        <div className="flex items-center gap-3 space-x-1">
          <TimerComponent isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning}/>
          {!darkTheme ? (
            <button onClick={handleThemeChange} className={`${commonIconButtonClass} mr-2`}>
              <Moon size={18} />
            </button>
          ) : (
            <button onClick={handleThemeChange} className={`${commonIconButtonClass} mr-2`}>
              <Sun size={18} />
            </button>
          )}
          {!isFullScreen ? (
            <button onClick={enterFullscreen} className={`${commonIconButtonClass} mr-2`}>
              <Maximize2 size={18} />
            </button>
          ) : (
            <button onClick={exitFullscreen} className={`${commonIconButtonClass} mr-2`}>
              <Minimize2 size={18} />
            </button>
          )}
          <div className="relative mr-3">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-white transition-all duration-150"
              aria-label="Open user menu"
              aria-haspopup="true"
              aria-expanded={isProfileDropdownOpen}
            >
              <img
                className="h-5 w-5 rounded-full object-cover"
                src={
                  user.profileImageUrl ||
                  "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                }
                alt="User avatar"
              />
              <ChevronDown
                className={`h-4 w-4 ml-1 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  key="profileDropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-right absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-slate-300 ring-opacity-5 dark:ring-slate-700 focus:outline-none z-50 right-4"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {profileDropdownSection.map(({ label, key }) => (
                    <button
                      key={key}
                      onClick={() => handleProfileItemClick(key)}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                      role="menuitem"
                    >
                      {label}
                    </button>
                  ))}
                  {user?.role === "admin" && (
                    <button
                      key={"adminPortal"}
                      onClick={() => navigate("/admin-portal")}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                      role="menuitem"
                    >
                      Admin Portal
                    </button>
                  )}
                  <div key="divider" className="border-t border-slate-200 dark:border-slate-700 my-1" />
                  <button
                    key={"logout"}
                    onClick={() => handleProfileItemClick("logout")}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main area with resizable panels */}
      <div
        ref={problemPageRef}
        className="flex flex-grow w-full overflow-hidden bg-gray-50 dark:bg-slate-900 relative"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        {/* Left panel */}
        <div style={{ width: `${leftPanelWidth}px` }} className="h-full overflow-hidden flex-shrink-0">
          <LeftPanel
            toggleProblemSidebar={toggleProblemSidebar}
            problem={problem}
            submissionResult={submissionResult}
            showSubmissionResult={showSubmissionResult}
            setShowSubmissionResult={setShowSubmissionResult}
            code={code}
            isProblemLiked={isProblemLiked}
            handleLikeButton={handleLikeButton}
            isProblemFavourite={isProblemFavourite}
            handleFavouriteButton={handleFavouriteButton}
            isProblemBookmarked={isProblemBookmarked}
            setIsProblemBookmarked={setIsProblemBookmarked}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        </div>

        {/* Divider */}
        <div
          className="cursor-e-resize bg-gray-300 dark:bg-slate-500 hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors duration-150 flex-shrink-0"
          style={{ width: `${dividerActualWidth}px` }}
          onMouseDown={handleMouseDownOnDivider}
          role="separator"
          aria-orientation="vertical"
          tabIndex={0}
          onKeyDown={handleKeyDownOnDivider}
        />

        {/* Right panel */}
        <div className="flex-grow h-full overflow-hidden">
          <RightPanel
            problem={problem}
            problems={problems}
            setProblems={setProblems}
            submissionResult={submissionResult}
            setSubmissionResult={setSubmissionResult}
            showSubmissionResult={showSubmissionResult}
            setShowSubmissionResult={setShowSubmissionResult}
            code={code}
            setCode={setCode}
            darkTheme={darkTheme}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
      </div>
    </main>
  );
};

export default SolveProblemPage;
