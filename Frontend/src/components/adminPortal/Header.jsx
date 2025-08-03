import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronDown, Bell } from 'lucide-react';
import { Sun, Moon, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileDropdownSection } from '../../utils/constants';
import { getRoutes } from '../../utils/heplerFunctions';

const Header = ({ darkTheme, handleThemeChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.authSlice);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);
  
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  const handleProfileItemClick = (action) => {
    navigate(getRoutes(action));
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Admin Dashboard';
      case '/problems':
        return 'Problem Management';
      case '/create-problem':
        return 'Create New Problem';
      case '/users':
        return 'User Management';
      case '/create-user':
        return 'Create New User';
      default:
        if (location.pathname.startsWith('/problems/edit')) return 'Edit Problem';
        if (location.pathname.startsWith('/users/edit')) return 'Edit User';
        return 'Admin Portal';
    } 
  };

  return (
    <header className="h-16 bg-[#FFFFFF]/80 dark:bg-[#1E293B]/80 backdrop-blur-sm flex-shrink-0 flex items-center justify-between px-8 border-b border-[#E2E8F0] dark:border-[#334155]">
      <h1 className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{getTitle()}</h1>
      <div className="flex items-center space-x-4">
        <NavLink to="/">
          <button
            className="p-2 rounded-full text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            aria-label="Toggle theme"
          >
            <Home size={20} />
          </button>
        </NavLink>
        <button
          onClick={handleThemeChange}
          className="p-2 rounded-full text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          aria-label="Toggle theme"
        >
          {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative p-2 rounded-full hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]">
          <Bell size={20} className="text-[#64748B] dark:text-[#94A3B8]" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#FFFFFF] dark:ring-[#1E293B]"></span>
        </button>

        <div className="relative">
          {/* Profile Avatar and Dropdown */}
          <button
            ref={avatarButtonRef}
            onClick={toggleProfileDropdown}
            className="flex items-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all duration-150"
            aria-label="Open user menu"
            aria-haspopup="true"
            aria-expanded={isProfileDropdownOpen}
          >
            <img
              className="h-6 w-6 rounded-full object-cover"
              src={user.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"}
              alt="User avatar"
            />
            <ChevronDown className={`h-4 w-4 ml-1 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                key="profileDropdown"
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-3 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-slate-300 ring-opacity-5 dark:ring-slate-700 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                {profileDropdownSection.map(({ label, key }) =>
                  <button
                    key={key}
                    onClick={() => handleProfileItemClick(key)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                    role="menuitem"
                  >
                    {label}
                  </button>
                )}
                <button
                  key={"adminPortal"}
                  onClick={() => navigate("/admin-portal")}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                  role="menuitem"
                >
                  Admin Portal
                </button>
                <div key="divider" className="border-t border-slate-200 dark:border-slate-700 my-1" />
                <button
                  key={'logout'}
                  onClick={() => handleProfileItemClick('logout')}
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
    </header>
  );
};

export default Header;
