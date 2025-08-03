import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { MOCK_COURSES, MOCK_TESTIMONIALS, APP_ROUTES, courses } from '../utils/constants';
import TestimonialCard from '../components/coursePage/TestimonialCard';
import { StarIcon, ClockIcon, UsersIcon, CheckCircleIcon, BookOpenIcon, ChevronDownIcon, ChevronUpIcon, VideoCameraIcon, AcademicCapIcon, ArrowRightIcon } from '../components/Icons/CoursesPageIcons';
import axiosClient from '../config/axios';

const CourseOverviewPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const getCourse = async () => {
    try{
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${courseId}&maxResults=50&key=${import.meta.env.VITE_YT_V3_API_KEY}`);
      const { items } = await response.json(); 
      const foundCourse = courses.find(c => c.id === courseId) || null;
      foundCourse.curriculum = [{ id: "rm1", title: foundCourse.title, lectures: items}];
      setCourse(foundCourse);
    } catch(error) {
        console.log(error);
    }
  }
  getCourse();
    // const foundCourse = courses.find(c => c.id === courseId) || null;
    // setCourse(foundCourse);
    // if (foundCourse) {
    //   const courseTestimonials = MOCK_TESTIMONIALS.filter(t => t.courseId === foundCourse.id);
    //   setTestimonials(courseTestimonials);
    //   if (foundCourse.curriculum && foundCourse.curriculum.length > 0) {
    //     setExpandedModules({ [foundCourse.curriculum[0].id]: true });
    //   }
    // }
  }, [courseId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <h1 className="text-2xl text-slate-800 dark:text-white">Course not found.</h1>
        <Link to={APP_ROUTES.courses} className="ml-4 text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400">Back to Courses</Link>
      </div>
    );
  }

  const firstLectureUrl = course.curriculum?.[0]?.lectures?.[0]?.id 
    ? APP_ROUTES.courseContent.replace(':courseId', course.id).replace(':lectureId', course.curriculum[0].lectures[0].id)
    : '#';

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Hero Section */}
      <div className="bg-slate-100 dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            <p className="text-base font-semibold text-orange-600 dark:text-orange-500 uppercase tracking-wide">{course.category.join(', ')}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">{course.title}</h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">{course.tagline}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Last updated: {course.publishedAt}</p>
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center">
                <img src={course.instructorProfileImageUrl} alt={course.instructorName} className="w-10 h-10 rounded-full mr-2 border-2 border-slate-300 dark:border-slate-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Created by <span className="font-semibold text-slate-900 dark:text-white">{course.istructorName}</span></span>
              </div>
              {course.rating && (
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{course.rating.toFixed(1)} rating</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center"><ClockIcon className="w-5 h-5 mr-1.5"/> {course.itemCount}</div>
                <div className="flex items-center"><AcademicCapIcon className="w-5 h-5 mr-1.5"/> {course.difficulty}</div>
                {course.enrollmentCount && <div className="flex items-center"><UsersIcon className="w-5 h-5 mr-1.5"/> {course.enrollmentCount?.toLocaleString()} students</div>}
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl overflow-hidden">
              <img src={course.url} alt={course.title} className="w-full h-56 object-cover"/>
              <div className="p-6">
                {course.isFree ? (
                  <p className="text-3xl font-bold text-green-500">FREE</p>
                ) : (
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">${course.price.toFixed(2)}</p>
                )}
                <Link
                  to={firstLectureUrl}
                  className="btn btn-primary btn-primary-lg mt-6 w-full group"
                >
                  <span>{course.isFree ? 'Start Learning Now' : 'Enroll in Course'}</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-3 text-xs text-slate-500 text-center">30-Day Money-Back Guarantee (for paid courses)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            {/* <section className="mb-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {course.whatYoullLearn.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0 group-hover:text-green-400 transition-colors" />
                    <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section> */}

            {/* Curriculum */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {course.curriculum.map((module) => (
                  <div key={ module.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                      aria-expanded={expandedModules[module.id]}
                      aria-controls={`module-content-${module.id}`}
                    >
                      <h3 className="text-lg font-medium text-slate-800 dark:text-white">{module.title}</h3>
                      <ChevronDownIcon className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${expandedModules[module.id] ? 'transform rotate-180' : ''}`} />
                    </button>
                    <div 
                      id={`module-content-${module.id}`}
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedModules[module.id] ? 'max-h-screen' : 'max-h-0'}`}
                    >
                      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                        {module.lectures?.map((lecture) => (
                          <li key={lecture.contentDetails?.videoId}>
                            <Link to={APP_ROUTES.courseContent.replace(':courseId', course.id).replace(':lectureId', lecture.contentDetails?.videoId)} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 group transition-colors">
                              <div className="flex items-center">
                                <VideoCameraIcon className="w-5 h-5 text-orange-500 dark:text-orange-500 mr-3 flex-shrink-0 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                                <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{lecture.snippet?.title}</span>
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">{lecture.duration}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

             {/* Description */}
             <section className="mb-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Description</h2>
              <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none" dangerouslySetInnerHTML={{ __html: course.description.replace(/\n/g, '<br/>') }}></div>
            </section>


            {/* Testimonials */}
            {testimonials.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Student Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Instructor Info) */}
          <aside className="mt-12 lg:mt-0 lg:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md sticky top-24 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">About the Instructor</h3>
                <div className="flex items-center mb-3">
                    <img src={course.instructorProfileImageUrl} alt={course.istructorName} className="w-16 h-16 rounded-full mr-4 border-2 border-slate-300 dark:border-slate-600"/>
                    <div>
                        <h4 className="text-lg font-medium text-slate-900 dark:text-white">{course.istructorName}</h4>
                        <p className="text-sm text-orange-600 dark:text-orange-400">Lead Instructor</p>
                    </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {course.istructorName} is a seasoned software engineer with over 10 years of experience in the industry, specializing in {course.category[0]} and passionate about teaching complex concepts in an accessible way.
                </p>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewPage;