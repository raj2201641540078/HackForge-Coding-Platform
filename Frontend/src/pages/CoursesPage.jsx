import React, { useState } from 'react';
import { courses } from '../utils/constants';
import CourseCard from '../components/coursePage/CourseCard';
import { BookOpenIcon, InformationCircleIcon } from '../components/Icons/CoursesPageIcons';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                          (filterType === 'free' && course.isFree) ||
                          (filterType === 'paid' && !course.isFree);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen text-slate-100 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <BookOpenIcon className="w-16 h-16 mx-auto text-orange-500 mb-2" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-700 dark:text-white">Explore Our Courses</h1>
          <p className="mt-3 text-xl text-slate-400 max-w-2xl mx-auto">
            Expand your knowledge and skills with our curated collection of coding courses.
          </p>
        </header>

        {/* Filters and Search */}
        <div className="mb-8 p-6 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search courses by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow w-full md:w-auto bg-gray-50 dark:bg-slate-700 text-black dark:text-white placeholder-slate-400 border border-slate-600 rounded-md py-2.5 px-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="flex space-x-2">
            {(['all', 'free', 'paid']).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`btn ${
                  filterType === type
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Courses
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md">
            <InformationCircleIcon className="w-16 h-16 mx-auto text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">No Courses Found</h3>
            <p className="text-slate-400">
              We couldn't find any courses matching your current search "{searchTerm}" and filter "{filterType}".
            </p>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search terms or broadening your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;