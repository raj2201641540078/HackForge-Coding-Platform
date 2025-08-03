import './App.css'
import { Routes, Route } from "react-router";
import { HomePage, SignupPage, LoginPage, LogoutPage, LoadingPage, ProblemsPage, SolveProblemPage, AccountPage, VerifyEmailPage, CoursesPage, CourseOverviewPage, CourseContentPage, ProfilePage, AdminPortal, LeaderboardPage, MyProblemsPage, MySprintsPage, PremiumPage, ContestsPage, PremiumCheckoutPage, PrivacyPolicyPage, AboutUsPage, ContactPage } from "./pages";
import { authenticateUser } from './slices/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router';
import Layout from './components/shared/Layout';
import { Toaster } from 'react-hot-toast';
import { AllRecentSubmissionsPage, Dashboard, ProblemManager, CreateProblem, UpdateProblem, CreateUser, UserManager, UpdateUser, VideoSolutionManager, UploadVideoSolution, SprintDetail } from './components';

function App() {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("theme") || "dark");
  const { loading, isAuthenticated } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  const  handleThemeChange = useCallback(() => {  
      const theme = darkTheme ? "light" : "dark";
      localStorage.setItem("theme", theme);
      setDarkTheme(!darkTheme);
  }, [darkTheme]);

  return(
    <>
    <Toaster position="top-right" />
    
    <div className={`${darkTheme? "dark": ""} flex flex-col min-h-screen bg-white dark:bg-gray-900`}> 
      {loading ? 
        <LoadingPage />
        : 
        <Routes>
          <Route path="/" element={<Layout darkTheme={darkTheme} handleThemeChange={handleThemeChange} />} >
            <Route index element={ <HomePage /> }/>
            <Route path="/signup" element={ isAuthenticated ? <Navigate to="/" /> : <SignupPage /> } />
            <Route path="/login" element={ isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/logout" element={ isAuthenticated ? <LogoutPage /> :  <Navigate to="/" /> }/>
            <Route path="/courses" element={ isAuthenticated ? <CoursesPage /> : <Navigate to="/login" /> }/>
            <Route path="/leaderboard" element={ isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" /> }/>
            <Route path="/contests" element={ isAuthenticated ? <ContestsPage /> : <Navigate to="/login" /> }/>
            <Route path="/my-problems/:activeTab" element={ isAuthenticated ? <MyProblemsPage /> : <Navigate to="/login" /> }/>
            <Route path="/privacy-policy" element={ <PrivacyPolicyPage /> }/>
            <Route path="/about-us" element={ <AboutUsPage /> }/>
            <Route path="/contact-us" element={ <ContactPage /> }/>
            <Route path="/my-sprints" element={ isAuthenticated ? <MySprintsPage /> : <Navigate to="/login" /> }>
              <Route path=":sprintName" element={<SprintDetail />} />
            </Route>
            <Route path="/profile/my-submissions" element={ isAuthenticated ? <AllRecentSubmissionsPage /> : <Navigate to="/login" /> }/>
            <Route path="/courses/:courseId" element={ isAuthenticated ? <CourseOverviewPage /> : <Navigate to="/login" /> }/>
            <Route path="/courses/:courseId/lecture/:lectureId" element={ isAuthenticated ? <CourseContentPage /> : <Navigate to="/login" /> }/>
            <Route path="/profile/@me" element={ isAuthenticated ? <ProfilePage /> : <Navigate to="/login" /> }/>
            <Route path="/profile/account" element={ isAuthenticated ? <AccountPage /> : <Navigate to="/login" /> }/>
            <Route path="/profile/account/verify-email" element={ isAuthenticated ? <VerifyEmailPage /> : <Navigate to="/login" /> }/>
            <Route path="/premium-plans" element={ isAuthenticated ? <PremiumPage /> : <Navigate to="/login" /> } >
              <Route path=":planId/checkout" element={<PremiumCheckoutPage />} />
            </Route>
          </Route>
          <Route path="/admin-portal" element={<AdminPortal darkTheme={darkTheme} handleThemeChange={handleThemeChange} />} >
            <Route index element={<Dashboard />} />
            <Route path="problems" element={<ProblemManager />} />
            <Route path="problems/create-new" element={<CreateProblem />} />
            <Route path="problems/edit/:problemId" element={<UpdateProblem />} />
            <Route path="users" element={<UserManager />} />
            <Route path="users/create-user" element={<CreateUser />} />
            <Route path="users/edit/:userId" element={<UpdateUser />} />
            <Route path="video-solutions" element={<VideoSolutionManager />} />
            <Route path="video-solutions/upload/:problemId" element={<UploadVideoSolution />} />
          </Route>
          <Route path="/problems" element={ isAuthenticated ? <ProblemsPage darkTheme={darkTheme} handleThemeChange={handleThemeChange} /> : <Navigate to="/login" /> }>
            <Route path=":problemId" element={ <SolveProblemPage darkTheme={darkTheme} handleThemeChange={handleThemeChange} /> }/>
          </Route>
        </Routes>
      }
    </div>
    </>
  )

}

export default App;