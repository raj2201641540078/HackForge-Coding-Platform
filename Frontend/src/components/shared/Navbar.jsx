import { useState, useEffect, useRef } from 'react';
import { HackForgeLogo } from "../../components"
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { getRoutes } from '../../utils/heplerFunctions';
import { profileDropdownSection, defaultProfileImageUrl } from '../../utils/constants';

const Navbar = ({darkTheme, handleThemeChange}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.authSlice);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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


  const navLinks = [
    { name: 'Problems', href: '/problems' },
    { name: 'Contests', href: '/contests' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Courses', href: '/courses' },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg shadow-lg dark:shadow-xl fixed w-full z-50 top-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center" aria-label="HackForge Home">
            <HackForgeLogo size={7} className="" /> 
            <span className="font-bold text-2xl text-slate-800 dark:text-white ml-3 tracking-tight">HackForge</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
          {!darkTheme &&
            <button onClick={handleThemeChange} className='p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100'>
              <Moon size={18}/>
            </button>
          }
          {darkTheme &&
            <button onClick={handleThemeChange} className='p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100'>
              <Sun size={18}/>
            </button>
          }
          {
            isAuthenticated ? (
              <div className="relative">
                {/* Profile Avatar and Dropdown */}
                <button
                  ref={avatarButtonRef}
                  onClick={toggleProfileDropdown}
                  className="flex items-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:dark:ring-offset-white transition-all duration-150"
                  aria-label="Open user menu"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profileImageUrl || defaultProfileImageUrl}
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
                      className="top-12 right-0 absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-slate-300 ring-opacity-5 dark:ring-slate-700 focus:outline-none z-50"
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
                      {user?.role === 'admin' && 
                        <button
                          key={"adminPortal"}
                          onClick={() => navigate("/admin-portal")}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#FF7F00] transition-colors"
                          role="menuitem"
                        >
                          Admin Portal
                        </button>
                      }
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
            ) : (
              <>
                <button onClick={() => { navigate("/login") }}
                  className="text-slate-600 dark:text-gray-300 bg-transparent hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                >
                  Log In
                </button>
                <button onClick={() => { navigate("/signup") }}
                  className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )
          }

          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:focus:ring-white transition-colors duration-150"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
               <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)} 
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3 px-3">
            {
              isAuthenticated ? (
                <button onClick={ ()=> { navigate("/logout") } } className="w-full text-left text-slate-600 dark:text-gray-300 bg-transparent hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150">
                  Log Out
                </button>
              ) : (
                <>
                  <button onClick={ ()=> { navigate("/login") } } className="w-full text-left text-slate-600 dark:text-gray-300 bg-transparent hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150">
                    Log In
                  </button>
                  <button onClick={ ()=> { navigate("/signup") } } className="w-full text-left text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 shadow-md hover:shadow-lg">
                    Sign Up
                  </button>
                </>
              )
            }
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;