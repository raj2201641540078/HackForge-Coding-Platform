// /components/CourseCard.jsx

import { NavLink } from "react-router";

const CourseCard = ({ imageUrl, title, description, level, duration, isFeatured, redirect }) => (
  <div 
    className={`
      flex-shrink-0 w-[90%] sm:w-[50%] md:w-[40%] lg:w-1/3 snap-center
      bg-white dark:bg-slate-900 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden 
      border border-slate-200 dark:border-gray-700/50 flex flex-col
      transform transition-all duration-500 ease-in-out
      ${isFeatured ? 'scale-105 z-10 shadow-2xl dark:shadow-3xl' : 'scale-90 opacity-80 hover:opacity-100'}
    `}
  >
    <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">{level}</span>
        <span className="text-xs text-slate-500 dark:text-gray-400">{duration}</span>
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-6">
        <NavLink 
          to={redirect}
          className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-150"
        >
          View Course
        </NavLink>
      </div>
    </div>
  </div>
);

export default CourseCard;