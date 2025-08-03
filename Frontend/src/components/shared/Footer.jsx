import React from 'react';
import { HackForgeLogo } from "..";
import { NavLink } from 'react-router';

const Footer = () => {
  const footerLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact-us' },
    // { name: 'Terms of Service', href: '/' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Siddharth9304' },
    { name: 'Twitter', href: 'https://x.com/premSid9304' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/premsiddhartha' },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <HackForgeLogo size={6} className="" />
              <span className="font-bold text-xl text-slate-800 dark:text-white ml-2">HackForge</span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              Sharpen your coding skills and forge your future with our comprehensive problem-solving platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul role="list" className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <NavLink to={link.href} className="text-base text-slate-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect With Us</h3>
            <ul role="list" className="mt-4 space-y-2">
             {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target='_blank' className="text-base text-slate-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-base text-slate-500 dark:text-gray-400">&copy; {new Date().getFullYear()} HackForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;