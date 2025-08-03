// /components/FeaturedCoursesSection.jsx

import React, { useState, useRef } from 'react';
import CourseCard from './CourseCard';

const courses = [
  {
    imageUrl: "https://i.ytimg.com/vi/WOyZid8OkkI/sddefault.jpg",
    title: "GenAI Playlist",
    description: "Understand GenAI deeply: from fundamentals to internal mechanisms.",
    level: "All Levels",
    duration: "Ongoing",
    redirect: "courses/PLd7PleJR_EFfRYiLdagOsv4FczMl1Cxt_"
  },
  {
    imageUrl: "https://i.ytimg.com/vi/AK0hu0Zxua4/sddefault.jpg",
    title: "System Design (LLD)",
    description: "Explore Low Level Design (LLD) for systems from scratch here",
    level: "All Levels",
    duration: "40+ Hours",
    redirect: "courses/PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"
  },
  {
    imageUrl: "https://i.ytimg.com/vi/moZNKL37w-s/sddefault.jpg",
    title: "Data Structures & Algorithms",
    description: "Your ultimate guide to Data Structures and Algorithms using C++.",
    level: "All Levels",
    duration: "200+ Hours",
    redirect: "courses/PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01"
  },
  {
    imageUrl: "https://i.ytimg.com/vi/y3OOaXrFy-Q/sddefault.jpg",
    title: "C++ Complete Playlist",
    description: "Master C++ programming from basics to advanced topics, all covered.",
    level: "Beginner",
    duration: "20+ Hours",
    redirect: "courses/PLQEaRBV9gAFsdNoZYUcVG6ygpwd0lUrIH"
  },

];

const Arrow = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      absolute top-1/2 -translate-y-1/2 z-20 
      w-12 h-12 rounded-full bg-white/70 dark:bg-slate-900 shadow-lg
      flex items-center justify-center
      text-slate-700 dark:text-white
      hover:bg-white dark:hover:bg-gray-800
      transition-all duration-300
      disabled:opacity-40 disabled:cursor-not-allowed
      ${direction === 'left' ? 'left-0 md:-left-6' : 'right-0 md:-right-6'}
    `}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      )}
    </svg>
  </button>
);


const FeaturedCoursesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the middle card featured
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const newIndex = direction === 'left' 
      ? Math.max(currentIndex - 1, 0)
      : Math.min(currentIndex + 1, courses.length - 1);

    setCurrentIndex(newIndex);
    
    const container = scrollContainerRef.current;
    if (container) {
      const card = container.children[newIndex];
      const scrollLeft = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Level Up with Our Featured Courses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-gray-400">
            Guided learning paths designed by industry experts to master key concepts and technologies.
          </p>
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-10">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-x-4 md:gap-x-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-10 px-4 md:px-0"
        >
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              isFeatured={index === currentIndex}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <Arrow direction="left" onClick={() => handleScroll('left')} disabled={currentIndex === 0} />
        <Arrow direction="right" onClick={() => handleScroll('right')} disabled={currentIndex === courses.length - 1} />
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;