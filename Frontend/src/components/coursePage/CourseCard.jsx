import React from 'react';
import { Link } from 'react-router';
import { APP_ROUTES } from '../../utils/constants';
import { StarIcon, ClockIcon, AcademicCapIcon, LevelEasyIcon, LevelIntermediateIcon, LevelAdvancedIcon } from '../Icons/CoursesPageIcons';


const DifficultyIcon = ({ difficulty }) => {
  switch (difficulty) {
    case "Beginner":
      return <LevelEasyIcon className="w-5 h-5 text-green-400" />;
    case "Intermediate":
      return <LevelIntermediateIcon className="w-5 h-5 text-yellow-400" />;
    case "Advanced":
    case "Expert":
      return <LevelAdvancedIcon className="w-5 h-5 text-red-400" />;
    default:
      return null;
  }
};


const CourseCard = ({ course }) => {
  const courseUrl = APP_ROUTES.courseOverview.replace(':courseId', course.id);

  return (
    <Link
      to={courseUrl}
      className="block group bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500"
    >
      <div className="relative">
        <img src={course.url} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        {course.isFree && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">FREE</span>
        )}
        {!course.isFree && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">${course.price.toFixed(2)}</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
            {course.category.slice(0,1).map(cat => (
                 <span key={cat} className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{cat}</span>
            ))}
             {course.rating && (
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    {course.rating.toFixed(1)}
                </div>
            )}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-orange-400 transition-colors duration-300 truncate">{course.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 h-10 overflow-hidden text-ellipsis">{course.tagline}</p>

        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
          <div className="flex items-center">
            <AcademicCapIcon className="w-4 h-4 mr-1.5 text-slate-400 dark:text-slate-500" />
            <span>{course.difficulty}</span>
          </div>
          <div className="flex items-center">
            <span>{`${course.itemCount} lectures`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
