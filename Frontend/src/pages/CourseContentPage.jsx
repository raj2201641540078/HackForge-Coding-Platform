import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { MOCK_COURSES, APP_ROUTES, courses } from '../utils/constants';
import LectureVideoPlayer from '../components/coursePage/LectureVideoPlayer';
import RelatedProblemLink from '../components/coursePage/RelatedProblemLink';
import { VideoCameraIcon, DocumentTextIcon, ChatBubbleLeftEllipsisIcon, PaperClipIcon, ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon, BookOpenIcon, ArrowLeftIcon, InformationCircleIcon, CheckCircleIcon, CheckBadgeIcon, ArrowRightIcon } from '../components/Icons/CoursesPageIcons';


const mockDiscussions = [
  {
    id: 'd1',
    user: { name: 'Alice Wonder', avatarSeed: 'alice' },
    date: '2 days ago',
    text: 'Great explanation of Big O notation! I was always a bit confused about the difference between O(n log n) and O(n^2) in practice, but the examples here made it click.',
    replies: [
      { id: 'r1', user: { name: 'Bob The Builder', avatarSeed: 'bob' }, date: '1 day ago', text: 'Totally agree! The visualization for QuickSort partitioning really helped me too.' },
      { id: 'r2', user: { name: 'Instructor Eve', avatarSeed: 'inst_eve' }, date: '1 day ago', text: 'Glad you found it helpful, Alice! Keep an eye on the attachments for some extra practice problems on complexity analysis.' },
    ]
  },
  {
    id: 'd2',
    user: { name: 'Charlie Code', avatarSeed: 'charlie' },
    date: '5 hours ago',
    text: 'Is there a simpler way to handle state in the React example without using reducers for smaller components? Just curious about best practices for tiny apps.',
  }
];


const CourseContentPage = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isCurriculumSidebarVisible, setIsCurriculumSidebarVisible] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLectures, setCompletedLectures] = useState({});

  const TABS_CONFIG = [
    {
      id: 'description',
      name: 'Description',
      icon: DocumentTextIcon,
      renderContent: (lecture) => (
        <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
          <p dangerouslySetInnerHTML={{ __html: lecture.snippet?.description.replace(/\n/g, '<br/>') }}></p>
        </div>
      ),
    },
    {
      id: 'discussion',
      name: 'Discussion',
      icon: ChatBubbleLeftEllipsisIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Lecture Discussion</h3>
          <div className="space-y-6">
            {mockDiscussions.map((thread, index) => (
              <div key={thread.id} className={`p-4 bg-slate-100 dark:bg-slate-800 rounded-lg shadow ${index < mockDiscussions.length -1 ? "border-b border-slate-200 dark:border-slate-700 pb-6" : ""}`}>
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${thread.user.avatarSeed}`}
                    alt={thread.user.name}
                    className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-slate-200 dark:border-slate-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-orange-500 dark:text-orange-400">{thread.user.name}</span>
                      <span className="text-xs text-slate-500">{thread.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{thread.text}</p>
                  </div>
                </div>
                {thread.replies && thread.replies.length > 0 && (
                  <div className="ml-10 mt-4 pl-4 border-l border-slate-300 dark:border-slate-700 space-y-4">
                    {thread.replies.map(reply => (
                       <div key={reply.id} className="flex items-start space-x-3">
                          <img
                            src={`https://i.pravatar.cc/32?u=${reply.user.avatarSeed}`}
                            alt={reply.user.name}
                            className="w-8 h-8 rounded-full flex-shrink-0 border border-slate-300 dark:border-slate-600"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-orange-500 dark:text-orange-300">{reply.user.name}</span>
                              <span className="text-xs text-slate-500">{reply.date}</span>
                            </div>
                            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{reply.text}</p>
                          </div>
                      </div>
                    ))}
                  </div>
                )}
                 <button className="mt-4 text-xs text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400 hover:underline">Reply to thread</button>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <textarea
                  className="w-full p-3 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-slate-400 dark:placeholder-slate-400"
                  rows={3}
                  placeholder={`Ask a question or share your thoughts on "${lecture.title}"...`}
              ></textarea>
              <button className="btn btn-primary mt-3">
                  Post Comment
              </button>
          </div>
        </div>
      ),
    },
    {
      id: 'attachments',
      name: 'Attachments',
      icon: PaperClipIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Attachments</h3>
          {lecture.attachments && lecture.attachments.length > 0 ? (
            <ul className="space-y-3">
              {lecture.attachments.map((att, index) => (
                <li key={index} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md flex items-center justify-between hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group">
                  <div className="flex items-center">
                    <PaperClipIcon className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 group-hover:text-orange-400 dark:group-hover:text-orange-300"/>
                    <div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{att.name}</span>
                      <span className="block text-xs text-slate-500">{att.size}</span>
                    </div>
                  </div>
                  <a href={att.url} download className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400 font-medium p-2 rounded-md hover:bg-slate-300/50 dark:hover:bg-slate-750">Download</a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <InformationCircleIcon className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-500"/>
              <p className="font-medium">No Attachments Available</p>
              <p className="text-sm">There are no supplementary files for this lecture.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'problems',
      name: 'Related Problems',
      icon: PuzzlePieceIcon,
      renderContent: (lecture) => (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Practice Problems</h3>
          {lecture.relatedProblemIds && lecture.relatedProblemIds.length > 0 ? (
            <div className="space-y-3">
              {lecture.relatedProblemIds.map((problemId) => (
                <RelatedProblemLink key={problemId} problemId={problemId} />
              ))}
            </div>
          ) : (
             <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <PuzzlePieceIcon className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-500"/>
              <p className="font-medium">No Specific Problems Linked</p>
              <p className="text-sm">Check the main problem list for general practice exercises.</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getCourse = async () => {
      try{
          let allItems = [];
          let nextPageToken = '';
        do {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${courseId}&maxResults=50&key=${import.meta.env.VITE_YT_V3_API_KEY}`);
          const data = await response.json();

          if (data.items) {
            allItems.push(...data.items);
          }
          nextPageToken = data.nextPageToken || '';
         } while (nextPageToken);
        const foundCourse = courses.find(c => c.id === courseId) || null;
        foundCourse.curriculum = [{ id: "rm1", title: foundCourse.title, lectures: allItems}];
        setCourse(foundCourse);
      
    // const foundCourse = MOCK_COURSES.find(c => c.id === courseId) || null;
    // setCourse(foundCourse);
    if (foundCourse) {
      let lectureFound = false;
      let initialExpandedModules = { ...expandedModules };
      for (const module of foundCourse.curriculum) {
        const lecture = module.lectures.find(l => l.contentDetails?.videoId === lectureId);
        if (lecture) {
          setCurrentLecture(lecture);
          initialExpandedModules[module.id] = true; 
          lectureFound = true;
          break;
        }
      }
      setExpandedModules(initialExpandedModules);
      if (!lectureFound && foundCourse.curriculum?.[0]?.lectures?.[0]) {
        const firstLecture = foundCourse.curriculum[0].lectures[0];
        navigate(APP_ROUTES.courseContent.replace(':courseId', courseId).replace(':lectureId', firstLecture.contentDetails?.videoId), { replace: true });
      }
    }
    }catch(error) {
          console.log(error);
      }
    }
    getCourse();
  }, [courseId, lectureId, navigate]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleLectureSelect = (newLectureId) => {
    navigate(APP_ROUTES.courseContent.replace(':courseId', courseId).replace(':lectureId', newLectureId));
    if (window.innerWidth < 768) { 
      setIsCurriculumSidebarVisible(false); 
    }
  };
  
  const toggleLectureComplete = () => {
    if (currentLecture) {
      setCompletedLectures(prev => ({
        ...prev,
        [currentLecture.contentDetails?.videoId]: !prev[currentLecture.contentDetails?.videoId]
      }));
    }
  };


  if (!course || !currentLecture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
        Loading course content or content not found...
      </div>
    );
  }

  const lectureIndexInfo = (() => {
    let currentLectureIndex = -1;
    const flatLectures = [];
    course.curriculum.forEach(module => module.lectures.forEach(lec => flatLectures.push(lec)));
    const totalLecturesInCourse = flatLectures.length;

    let prevLectureId = null;
    let nextLectureId = null;

    for (let i = 0; i < totalLecturesInCourse; i++) {
      if (flatLectures[i].contentDetails?.videoId === currentLecture.contentDetails?.videoId) {
        currentLectureIndex = i;
        if (i > 0) prevLectureId = flatLectures[i - 1].contentDetails?.videoId;
        if (i < totalLecturesInCourse - 1) nextLectureId = flatLectures[i + 1].contentDetails?.videoId;
        break;
      }
    }
    return { currentLectureIndex, totalLecturesInCourse, prevLectureId, nextLectureId };
  })();
  
  const activeTabConfig = TABS_CONFIG.find(t => t.id === activeTab);

  const completedCount = Object.values(completedLectures).filter(Boolean).length;
  const courseProgress = lectureIndexInfo.totalLecturesInCourse > 0 
    ? (completedCount / lectureIndexInfo.totalLecturesInCourse) * 100 
    : 0;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-hidden relative">
      <main className="flex-1 md:w-2/3 flex flex-col overflow-y-auto dark-scrollbar bg-white dark:bg-slate-950 max-h-screen">
        <header className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 sticky top-0 bg-white dark:bg-slate-950 z-20 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">{currentLecture.snippet?.title}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Part of: <Link to={APP_ROUTES.courseOverview.replace(':courseId', course.id)} className="text-orange-500 dark:text-orange-400 hover:underline hover:text-orange-600 dark:hover:text-orange-300">{course.snippet?.title}</Link>
                </p>
            </div>
            <button
              onClick={() => setIsCurriculumSidebarVisible(!isCurriculumSidebarVisible)}
              className="md:hidden p-2 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 rounded-md"
              aria-label="Toggle curriculum"
              aria-expanded={isCurriculumSidebarVisible}
            >
              <BookOpenIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="p-3 md:p-6 flex-grow">
          <LectureVideoPlayer videoUrl={`https://www.youtube.com/embed/${currentLecture.contentDetails?.videoId}`} title={currentLecture.snippet?.title} />

          <div className="mt-4 md:mt-6 flex flex-wrap justify-between items-center gap-2">
             <button
                onClick={lectureIndexInfo.prevLectureId ? () => handleLectureSelect(lectureIndexInfo.prevLectureId) : undefined}
                disabled={!lectureIndexInfo.prevLectureId}
                className={`btn btn-secondary ${!lectureIndexInfo.prevLectureId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Previous
              </button>
            
            <button
                onClick={toggleLectureComplete}
                className={`btn min-w-[180px] border ${completedLectures[currentLecture.contentDetails?.videoId] 
                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-500 focus:ring-green-400' 
                    : 'bg-slate-600 hover:bg-slate-500 text-slate-200 border-slate-500 focus:ring-slate-400'}`}
              >
                {completedLectures[currentLecture.contentDetails?.videoId] ? 
                  <CheckBadgeIcon className="w-5 h-5 mr-1.5" /> : 
                  <CheckCircleIcon className="w-5 h-5 mr-1.5 opacity-70" />
                }
                {completedLectures[currentLecture.contentDetails?.videoId] ? 'Completed' : 'Mark as Complete'}
            </button>

             <button
                onClick={lectureIndexInfo.nextLectureId ? () => handleLectureSelect(lectureIndexInfo.nextLectureId) : undefined}
                disabled={!lectureIndexInfo.nextLectureId}
                className={`btn btn-primary ${!lectureIndexInfo.nextLectureId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next <ArrowRightIcon className="w-4 h-4 ml-1.5" />
              </button>
          </div>

          <div className="mt-6 md:mt-8">
            <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
              <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto" aria-label="Tabs">
                {TABS_CONFIG.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-3 px-2 sm:px-3 border-b-2 font-medium text-sm flex items-center transition-all rounded-t-md
                      ${activeTab === tab.id
                        ? 'border-orange-500 text-orange-500 bg-orange-500/10 dark:bg-slate-800'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                      }`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                  >
                    <tab.icon className={`w-5 h-5 mr-1.5 sm:mr-2 ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400'}`} />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div key={activeTab} className="py-4 animate-fadeIn">
              {activeTabConfig ? activeTabConfig.renderContent(currentLecture) : null}
            </div>
          </div>
        </div>
      </main>

      <aside className={`
        fixed inset-y-0 right-0 z-30 w-full max-w-xs sm:max-w-sm 
        transform transition-transform duration-300 ease-in-out
        bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden
        md:static md:w-1/3 md:max-w-none md:translate-x-0 md:flex-shrink-0 md:z-auto shadow-lg
      `}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
            <div className="flex items-center justify-between mb-2">
                <Link to={APP_ROUTES.courseOverview.replace(':courseId', course.id)} className="flex items-center text-orange-500 hover:text-orange-600 dark:hover:text-orange-300 group transition-colors">
                    <BookOpenIcon className="w-5 h-5 mr-2 group-hover:text-orange-600 dark:group-hover:text-orange-300"/>
                    <h2 className="text-md font-semibold truncate group-hover:text-orange-600 dark:group-hover:text-orange-300">{course.title}</h2>
                </Link>
                <button
                    onClick={() => setIsCurriculumSidebarVisible(false)}
                    className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 rounded-md"
                    aria-label="Close curriculum"
                >
                    <ChevronUpIcon className="w-5 h-5 transform rotate-90"/>
                </button>
            </div>
            
            { lectureIndexInfo.totalLecturesInCourse > 0 && (
                <div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{completedCount} / {lectureIndexInfo.totalLecturesInCourse} lectures</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 shadow-inner">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${courseProgress}%` }}></div>
                    </div>
                </div>
            )}
        </div>

        <nav className="flex-1 py-2 overflow-y-auto dark-scrollbar">
          {course.curriculum.map((module) => (
            <div key={module.id} className="mb-1">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex justify-between items-center px-4 py-2.5 text-sm font-medium text-left text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:bg-slate-200 dark:focus:bg-slate-700 focus:ring-1 focus:ring-orange-500 transition-colors rounded-md mx-2"
                aria-expanded={expandedModules[module.id]}
                aria-controls={`module-lectures-${module.id}`}
              >
                <span className="truncate">{module.title}</span>
                <ChevronDownIcon className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 ${expandedModules[module.id] ? 'rotate-180' : '' }`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedModules[module.id] ? 'max-h-[500px]' : 'max-h-0'}`}>
                <ul id={`module-lectures-${module.id}`} className="pl-5 border-l-2 border-slate-200 dark:border-slate-700 ml-5 py-1 mt-1">
                  {module.lectures.map((lecture) => (
                    <li key={lecture.contentDetails?.videoId}>
                      <button
                        onClick={() => handleLectureSelect(lecture.contentDetails?.videoId)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-md transition-all my-0.5 group ${
                          lecture.contentDetails?.videoId === currentLecture.contentDetails?.videoId
                            ? 'bg-orange-600 text-white font-semibold shadow-md ring-1 ring-orange-400'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-orange-500 dark:hover:text-orange-400'
                        }`}
                        aria-current={lecture.contentDetails?.videoId === currentLecture.contentDetails?.videoId ? "page" : undefined}
                      >
                        <div className="flex items-center">
                          {completedLectures[lecture.contentDetails?.videoId] ? (
                            <CheckBadgeIcon
                              className={`w-4 h-4 mr-2 flex-shrink-0 ${lecture.contentDetails?.videoId === currentLecture.contentDetails?.videoId ? 'text-white' : 'text-green-400 group-hover:text-green-300'}`} />
                          ) : (
                            <VideoCameraIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${lecture.contentDetails?.videoId === currentLecture.contentDetails?.videoId ? 'text-white' : 'text-slate-500 group-hover:text-orange-500 dark:text-slate-400 dark:group-hover:text-orange-400'}`} />
                          )}
                          <span className="truncate">{lecture.snippet?.title}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>
      </aside>
      
      {isCurriculumSidebarVisible && (
        <div 
            className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsCurriculumSidebarVisible(false)}
            aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default CourseContentPage;