export const APP_NAME = "HackForge";

// Mock Problems
export const MOCK_PROBLEMS = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', topics: ['Arrays', 'Hash Table'], acceptance: '49.2%', status: 'Solved' },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', topics: ['Linked List', 'Math'], acceptance: '38.5%', status: 'To Do' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topics: ['Hash Table', 'Strings', 'Sliding Window'], acceptance: '33.1%', status: 'To Do' },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topics: ['Arrays', 'Binary Search', 'Divide and Conquer'], acceptance: '35.0%', status: 'To Do' },
  { id: '5', title: 'Reverse Integer', difficulty: 'Easy', topics: ['Math'], acceptance: '27.9%', status: 'Attempted' },
  { id: '6', title: 'Container With Most Water', difficulty: 'Medium', topics: ['Arrays', 'Two Pointers'], acceptance: '54.1%', status: 'To Do' },
  { id: '7', title: 'Valid Parentheses', difficulty: 'Easy', topics: ['Strings', 'Stack'], acceptance: '41.2%', status: 'To Do' },
  { id: '8', title: 'Merge k Sorted Lists', difficulty: 'Hard', topics: ['Linked List', 'Divide and Conquer', 'Heap'], acceptance: '46.5%', status: 'To Do' },
  { id: '9', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topics: ['Arrays', 'Binary Search'], acceptance: '37.9%', status: 'To Do' },
  { id: '10', title: 'Climbing Stairs', difficulty: 'Easy', topics: ['Dynamic Programming', 'Math'], acceptance: '51.8%', status: 'To Do' },
  { id: '11', title: 'Generate Parentheses', difficulty: 'Medium', topics: ['Strings', 'Backtracking'], acceptance: '70.1%', status: 'Attempted' },
  { id: '12', title: 'Trapping Rain Water', difficulty: 'Hard', topics: ['Arrays', 'Two Pointers', 'Dynamic Programming', 'Stack'], acceptance: '57.2%', status: 'To Do' },
  { id: '13', title: 'Fizz Buzz', difficulty: 'Easy', topics: ['Math', 'Strings'], acceptance: '70.0%', status: 'Solved' },
  { id: '14', title: 'Maximum Subarray', difficulty: 'Easy', topics: ['Arrays', 'Divide and Conquer', 'Dynamic Programming'], acceptance: '50.3%', status: 'To Do' },
  { id: '15', title: 'Word Ladder', difficulty: 'Hard', topics: ['Hash Table', 'Strings', 'Breadth-First Search'], acceptance: '37.5%', status: 'To Do' },
];


// Filters
// topics
export const TOPICS_LIST = [
  "All Topics",
  "Arrays",
  "Strings",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Graphs",
  "Trees",
  "Binary Search",
  "Backtracking",
  "Linked List",
  "Two Pointers"
];

// difficulty level
export const DIFFICULTY_LEVELS = [
  "All Difficulties",
  "Basic",
  "Easy",
  "Medium",
  "Hard",
];

// status basis
export const STATUS_FILTER_OPTIONS = [
  'All Statuses',
  'Solved',
  'Attempted',
  'To Do', // This represents filtering for 'Todo' or undefined status
];

// Mock Problem
export const MOCK_PROBLEM = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  description: "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.\n\nYou can return the answer in any order.",
  tags: ["Array", "Hash Table"],
  acceptance: "49.2%",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: ""
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: ""
    }
  ],
  constraints: [
    "`2 <= nums.length <= 10^4`",
    "`-10^9 <= nums[i] <= 10^9`",
    "`-10^9 <= target <= 10^9`",
    "**Only one valid answer exists.**"
  ],
  defaultCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return []; // Should not be reached based on problem description
};`
};

export const OUTPUT_TABS = {
  CONSOLE: "Console",
  TEST_CASES: "Test Results"
};


export const CourseDifficulty = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced"
};

export const APP_ROUTES = {
  home: "/",
  courses: "/courses",
  courseOverview: "/courses/:courseId",
  courseContent: "/courses/:courseId/lecture/:lectureId",
  login: "/login", // Mock, assuming these exist
  signup: "/signup", // Mock
  problemsBase: "/problems", // Mock base path for problems
  problemView: "/problems/:problemId", // Mock
};

const instructor1 = { id: "inst1", name: "Dr. Code Alchemist", avatarUrl: "https://picsum.photos/seed/inst1/100/100" };
const instructor2 = { id: "inst2", name: "Syntax Sorceress", avatarUrl: "https://picsum.photos/seed/inst2/100/100" };

// Sample YouTube videos for testing
const sampleYoutubeVideo1 = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rick Astley (placeholder)
const sampleYoutubeVideo2 = "https://www.youtube.com/watch?v= এবিবি_ই_এমও_জেএস"; // A generic coding tutorial placeholder (Bengali characters in ID for diverse testing)
const sampleYoutubeVideoShort = "https://youtu.be/3JZ_D3ELwOQ"; // Short nature video
const directSampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Keep a direct video for mixed content

const lecturesModule1 = [
  {
    id: "l1_1",
    title: "Introduction to Data Structures (YouTube)",
    duration: "08:15",
    videoUrl: sampleYoutubeVideo1,
    description: "An overview of fundamental data structures and their importance in computer science. We'll cover abstract data types and why they matter for efficient coding.",
    attachments: [
        {name: "Intro_Slides.pdf", url:"#", size:"1.2MB"},
        {name: "SourceCode_Examples.zip", url:"#", size:"850KB"}
    ],
    relatedProblemIds: ["ds_intro_q1", "array_basics_1"]
  },
  {
    id: "l1_2",
    title: "Arrays and Strings (Direct Video)",
    duration: "12:30",
    videoUrl: directSampleVideoUrl,
    description: "Deep dive into arrays and string manipulation techniques. Covers multi-dimensional arrays, common string operations, and performance considerations.",
    attachments: [
        {name: "StringAlgo_Notes.pdf", url:"#", size:"600KB"}
    ],
    relatedProblemIds: ["two_sum", "reverse_string", "string_compression_easy"]
  },
  {
    id: "l1_3",
    title: "Linked Lists (YouTube Short Format)",
    duration: "15:00",
    videoUrl: sampleYoutubeVideoShort,
    description: "Understanding singly, doubly, and circular linked lists. Operations like insertion, deletion, and traversal will be explored with examples.",
    attachments: [
        {name: "LinkedList_Visualizations.pdf", url:"#", size:"1.1MB"},
        {name: "Practice_Problems_LL.docx", url:"#", size:"300KB"}
    ],
    relatedProblemIds: ["merge_k_lists", "detect_cycle_list"]
  },
];

const lecturesModule2 = [
  {
    id: "l2_1",
    title: "Understanding Asymptotic Notation (YouTube)",
    duration: "10:00",
    videoUrl: "https://www.youtube.com/watch?v=9TlBTPvksZY", // Example: MIT Big O
    description: "Big O, Big Omega, and Big Theta explained. Learn how to analyze the time and space complexity of algorithms effectively.",
    attachments: [
        {name: "CheatSheet_BigO.pdf", url:"#", size:"450KB"}
    ],
    relatedProblemIds: ["complexity_quiz_1", "analyze_code_snippet_easy"]
  },
  {
    id: "l2_2",
    title: "Sorting Algorithms (Direct Video)",
    duration: "20:45",
    videoUrl: directSampleVideoUrl,
    description: "Comparison of various sorting algorithms like Merge Sort, Quick Sort, Heap Sort, and Bubble Sort. Includes implementation details and performance analysis.",
    attachments: [
        {name: "Sorting_CheatSheet.pdf", url:"#", size:"800KB"},
        {name: "QuickSort_Implementation.py", url:"#", size:"2KB"}
    ],
    relatedProblemIds: ["sort_array", "custom_sort_challenge_medium"]
  },
];

const lecturesModuleReact1 = [
 {
    id: "r1_1",
    title: "React Fundamentals (YouTube)",
    duration: "18:20",
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8", // Example: React JS Crash Course
    description: "Core concepts of React: Components, JSX, Props, State. Building your first React application from scratch.",
    attachments: [
        {name: "ComponentExamples.jsx", url:"#", size:"5KB"},
        {name: "React_Setup_Guide.md", url:"#", size:"8KB"}
    ],
    relatedProblemIds: ["jsx_basics_q", "simple_react_component"]
 },
 {
    id: "r1_2",
    title: "Hooks Deep Dive (Direct Video)",
    duration: "22:00",
    videoUrl: directSampleVideoUrl,
    description: "Exploring useState, useEffect, useContext, and custom hooks. Understand how hooks revolutionize state management and side effects in functional components.",
    attachments: [
        {name: "CustomHookGuide.md", url:"#", size:"12KB"},
        {name: "useEffect_Patterns.js", url:"#", size:"3KB"}
    ],
    relatedProblemIds: ["useEffect_puzzle", "custom_hook_exercise"]
 },
];


const curriculumDSA = [
  { id: "m1", title: "Module 1: Core Data Structures", lectures: lecturesModule1 },
  { id: "m2", title: "Module 2: Algorithms & Complexity", lectures: lecturesModule2 },
];

const curriculumReact = [
  { id: "rm1", title: "Module 1: Getting Started with React", lectures: lecturesModuleReact1 },
  { id: "rm2", title: "Module 2: Advanced State Management", lectures: [
      {
        id: "r2_1",
        title: "Redux and Zustand (YouTube)",
        duration: "25:00",
        videoUrl: "https://www.youtube.com/watch?v=NqzdVN2tyvQ", // Example: Redux in 100 Seconds
        description: "Managing complex state in React applications using popular libraries like Redux and Zustand. Comparing their pros and cons.",
        attachments: [ {name: "Redux_Boilerplate.zip", url:"#", size:"25KB"}],
        relatedProblemIds: ["redux_state_selector_q"]
      }
    ]
  },
];


export const MOCK_COURSES = [
  {
    id: "dsa-masterclass",
    title: "Data Structures & Algorithms Masterclass",
    tagline: "Unlock the secrets to efficient problem-solving.",
    description: "A comprehensive course covering all essential data structures and algorithms, from basic to advanced. Perfect for interview preparation and building a strong CS foundation.",
    instructor: instructor1,
    price: 49.99,
    isFree: false,
    thumbnailUrl: "https://picsum.photos/seed/dsa/600/400",
    category: ["Data Structures", "Algorithms", "Problem Solving"],
    difficulty: CourseDifficulty.Intermediate,
    duration: "25 hours",
    rating: 4.8,
    enrollmentCount: 12500,
    whatYoullLearn: [
      "Implement various data structures from scratch.",
      "Analyze algorithm complexity (Big O).",
      "Solve common coding interview problems.",
      "Understand trade-offs between different data structures."
    ],
    curriculum: curriculumDSA,
    lastUpdated: "November 2023"
  },
  {
    id: "react-deep-dive",
    title: "Modern React: From Beginner to Advanced",
    tagline: "Build dynamic and performant web applications with React.",
    description: "Learn React from the ground up, covering hooks, context API, state management, and best practices for building scalable applications.",
    instructor: instructor2,
    price: 0,
    isFree: true,
    thumbnailUrl: "https://picsum.photos/seed/react/600/400",
    category: ["Web Development", "React", "JavaScript"],
    difficulty: CourseDifficulty.Beginner,
    duration: "15 hours",
    rating: 4.6,
    enrollmentCount: 35000,
    whatYoullLearn: [
      "Build reusable React components.",
      "Manage application state effectively.",
      "Understand the React lifecycle and hooks.",
      "Integrate React with other libraries and APIs."
    ],
    curriculum: curriculumReact,
    lastUpdated: "October 2023"
  },
  {
    id: "python-for-everyone",
    title: "Python for Everyone: Zero to Hero",
    tagline: "Master Python, the versatile language for web, data science, and more.",
    description: "A beginner-friendly Python course that takes you from basic syntax to building real-world applications. No prior programming experience required.",
    instructor: instructor1,
    price: 19.99,
    isFree: false,
    thumbnailUrl: "https://picsum.photos/seed/python/600/400",
    category: ["Programming", "Python", "Beginner"],
    difficulty: CourseDifficulty.Beginner,
    duration: "20 hours",
    whatYoullLearn: [
      "Python fundamentals: variables, data types, control flow.",
      "Object-Oriented Programming in Python.",
      "Work with files and external libraries.",
      "Build simple scripts and applications."
    ],
    curriculum: [
      {
        id: "pm1",
        title: "Module 1: Python Basics (YouTube)",
        lectures: [{
            id: "pl1",
            title: "Hello Python & Setup",
            duration: "07:30",
            videoUrl: "https://www.youtube.com/watch?v=x7Xzbcq_xG4", // Example: Python Tutorial for Beginners
            description: "Your first Python program and setting up your development environment. Covers variables, basic types, and print statements.",
            attachments: [{name: "SetupGuide_WindowsLinuxMac.pdf", url:"#", size:"720KB"}, {name: "example_script_hello.py", url:"#", size:"1KB"}],
            relatedProblemIds: ["print_output_easy", "variable_swap_py"]
        }]
      },
      {
        id: "pm2",
        title: "Module 2: Data Structures in Python (Direct Video)",
        lectures: [{
            id: "pl2",
            title: "Lists, Tuples, and Dictionaries",
            duration: "12:00",
            videoUrl: directSampleVideoUrl,
            description: "Working with Python's built-in data structures: lists, tuples, and dictionaries. Common operations and use cases.",
            attachments: [{name: "PythonDataStructures_Cheatsheet.pdf", url:"#", size:"1.5MB"}, {name: "dict_examples.py", url:"#", size:"3KB"}],
            relatedProblemIds: ["dict_manipulation_1", "list_comprehension_task"]
        }]
      },
    ],
    lastUpdated: "September 2023"
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: "t1",
    courseId: "dsa-masterclass",
    user: { id: "user1", name: "Alex Morgan", avatarUrl: "https://picsum.photos/seed/user1/80/80" },
    rating: 5,
    text: "This DSA course is incredible! The explanations are clear, and the problems are challenging yet rewarding. Highly recommend!",
    date: "Oct 15, 2023"
  },
  {
    id: "t2",
    courseId: "dsa-masterclass",
    user: { id: "user2", name: "Sarah Chen", avatarUrl: "https://picsum.photos/seed/user2/80/80" },
    rating: 4,
    text: "Great content and well-structured. Some advanced topics could use more examples, but overall a fantastic learning experience.",
    date: "Nov 02, 2023"
  },
  {
    id: "t3",
    courseId: "react-deep-dive",
    user: { id: "user3", name: "John Doe", avatarUrl: "https://picsum.photos/seed/user3/80/80" },
    rating: 5,
    text: "As a beginner to React, this course was perfect. The instructor explains concepts very clearly and the projects are fun to build.",
    date: "Sep 20, 2023"
  },
   {
    id: "t4",
    courseId: "react-deep-dive",
    user: { id: "user4", name: "Priya Sharma", avatarUrl: "https://picsum.photos/seed/user4/80/80" },
    rating: 5,
    text: "I've taken many React courses, and this is by far one of the best free resources available. Comprehensive and up-to-date!",
    date: "Nov 10, 2023"
  }
];

export const LOGO_SVG_ORANGE = `
<svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FDBA74;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F97316;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path fill="url(#gradOrange)" d="M10,10 L50,90 L90,10 L70,10 L50,50 L30,10 Z" />
  <path fill="url(#gradOrange)" d="M50,55 L65,85 L35,85 Z" />
</svg>
`;

export const APP_LOGO_WHITE_SVG = `
<svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="white" d="M10,10 L50,90 L90,10 L70,10 L50,50 L30,10 Z" />
  <path fill="white" d="M50,55 L65,85 L35,85 Z" />
</svg>
`;

export const courses = [
    {
    "id": "PLd7PleJR_EFfRYiLdagOsv4FczMl1Cxt_",
    "publishedAt": "2025-05-24T04:14:01.641269Z",
    "title": "GenAI Playlist",
    "description": "Complete Playlist of GenAI, How does it work. We will talk about its internal also.",
    "url": "https://i.ytimg.com/vi/WOyZid8OkkI/sddefault.jpg",
    "channelTitle": "Rohit Negi",
    "itemCount": 6,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Understand GenAI deeply: from fundamentals to internal mechanisms.",
    "category": [
      "Artificial Intelligence",
      "Generative AI",
      "Technology"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFsdNoZYUcVG6ygpwd0lUrIH",
    "publishedAt": "2025-05-26T21:05:54.613869Z",
    "title": "C++ Complete Playlist",
    "description": "It is a Complete Playlist of C++, here we have covered each topic from basic to advance.",
    "url": "https://i.ytimg.com/vi/y3OOaXrFy-Q/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 20,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Master C++ programming from basics to advanced topics, all covered.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT",
    "publishedAt": "2025-05-12T03:58:54.625965Z",
    "title": "System Design Playlist",
    "description": "This is going to be a playlist on System Design, where we will cover Low Level Design from zero to Advance level. This LLD playlist is one stop solution for you.\n\nSOLID Principle\nUML Digram\n\n#systemdesign #lowleveldesign #hld",
    "url": "https://i.ytimg.com/vi/AK0hu0Zxua4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 16,
    "istructorName": "Aditya Tandon",
    "instructorProfileImageUrl": "https://media.licdn.com/dms/image/v2/D5622AQEhNHqNO002Mw/feedshare-shrink_800/B56Zb712DbGsAk-/0/1747981933004?e=1755129600&v=beta&t=8jsqyRJsqabunAadEVvruKP_lrjaPQhimuoL8GKpDPQ",
    "isFree": true,
    "price": null,
    "tagline": "Explore Low Level Design (LLD) for systems from scratch here.",
    "category": [
      "Software Architecture",
      "System Design"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFs7uC7pk8eSl2pFRpAEp_-R",
    "publishedAt": "2024-08-26T12:13:00.50559Z",
    "title": "Dynamic Programming Series",
    "description": "This is the complete series on Dynamic Programming, you can follow it to become Advance level coder.",
    "url": "https://i.ytimg.com/vi/_kio3U6CV2c/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 4,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Become an advanced coder with this complete Dynamic Programming series.",
    "category": [
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFte7vWOl3AWFABndCRCsIRQ",
    "publishedAt": "2024-05-14T18:58:08.926214Z",
    "title": "Graphs Series- by Rohit Negi",
    "description": "Graph Theory\nGraphs in C++\nWhat is Graph\nDFS and BFS",
    "url": "https://i.ytimg.com/vi/gGlfzqPT-hE/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 24,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Deep dive into Graph Theory and its C++ implementations now.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFtRabbmFxqeI6wa50L9EgcF",
    "publishedAt": "2024-03-25T22:58:33.103576Z",
    "title": "Heap Playlist",
    "description": "Heaps in C++\nHeap Data Structure\nHeap Insertion\nHeapify",
    "url": "https://i.ytimg.com/vi/ilz-VZBz5Vg/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 8,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Understand Heap data structure, C++ implementation, insertion and heapify.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFuKi_LhvHEF5M7-7smgVm4g",
    "publishedAt": "2024-03-18T00:00:39.523009Z",
    "title": "AVL Tree in Data Structure (Theory+Dry Run+Implementation)",
    "description": "AVL Tree\nRotation in AVL Tree",
    "url": "https://i.ytimg.com/vi/Sxb152a5Am8/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 2,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Explore AVL Trees: theory, dry run, and full implementation details.",
    "category": [
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Intermediate"
  },
  {
    "id": "PLQEaRBV9gAFtwXLv0a8knnkrSxKLUE5wl",
    "publishedAt": "2024-03-05T23:00:49.123589Z",
    "title": "Binary Search Tree Complete Playlist",
    "description": "Binary Search Tree\nInsertion in Binary Search Tree\nDelete in Binary Search Tree\nSearch in Binary Search Tree",
    "url": "https://i.ytimg.com/vi/pMHXL46exp4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 6,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Master Binary Search Trees: insertion, deletion, and search operations.",
    "category": [
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFsIul2ATmw7xP4eaQsjS_Lm",
    "publishedAt": "2024-02-20T23:54:37.601879Z",
    "title": "Trees Playlist ( Binary Tree | Binary Search Tree | AVL Tree)",
    "description": "All type of Trees",
    "url": "https://i.ytimg.com/vi/_b0bfpO3b4I/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 26,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Comprehensive guide to all tree types: Binary, BST, AVL included.",
    "category": [
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFtxdhJnAtTfOQj-pW-FIOO9",
    "publishedAt": "2024-02-13T13:34:11.461628Z",
    "title": "Queue Playlist",
    "description": "Queue in C++\nWhat is Queue",
    "url": "https://i.ytimg.com/vi/Ah-ZDJf9QW0/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 5,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Learn about Queue data structure and its C++ implementation basics.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFtzpMBLVYMh0bPC4Qk_EKbs",
    "publishedAt": "2024-02-04T23:53:08.608042Z",
    "title": "Stack Playlist",
    "description": "Introduction to Stack || What is Stack || What is Stack in C++",
    "url": "https://i.ytimg.com/vi/ZOS1fKa_WUY/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 7,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Introduction to Stack data structure and its applications in C++.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFu9fretbYEBkL0NFWnbfAt-",
    "publishedAt": "2024-01-17T00:37:17.609859Z",
    "title": "Linked List Complete Playlist",
    "description": "Linked List in C++\nDifferent problem in Linked List",
    "url": "https://i.ytimg.com/vi/CE150x4w0bo/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 12,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Solve various problems with Linked Lists in C++ completely.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFujcBWJhBT2XXsuMlIfETBy",
    "publishedAt": "2024-01-02T00:52:50.696929Z",
    "title": "Object Oriented Programming in C++",
    "description": "Introduction to OOPS\nWhat is Classes\nWhat is Object\nGetter and Setter\nPadding in C++\nAlignment in C++\nStatic vs Dynamic Memory Allocation",
    "url": "https://i.ytimg.com/vi/iw1Xf_33YM0/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 8,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Understand OOPS concepts: Classes, Objects, Getters, Setters in C++.",
    "category": [
      "C++",
      "Object Oriented Programming",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFudmlZ8smI0nasf0lyN3pp9",
    "publishedAt": "2023-12-04T23:49:45.420775Z",
    "title": "Recursion playlist c++",
    "description": "what is Recursion\nRecursion in c++\nRecursion relation",
    "url": "https://i.ytimg.com/vi/j_n1W5YgN_4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 20,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Master recursion in C++ from fundamentals to complex problem solving.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFttZ9ArI8oMp8eVrBC8ey-Y",
    "publishedAt": "2023-11-23T23:57:13.312337Z",
    "title": "Pointers in C++",
    "description": "",
    "url": "https://i.ytimg.com/vi/EUPirt55uY4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 6,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Grasp the core concepts of Pointers in C++ programming effectively.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFtoAOY_QtnLfFoVm84sa4K6",
    "publishedAt": "2023-11-19T17:05:41.924418Z",
    "title": "Sliding Window Protocol",
    "description": "",
    "url": "https://i.ytimg.com/vi/swBjx46TSP4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 5,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Learn the Sliding Window technique for efficient problem solving approaches.",
    "category": [
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFsL63CljIxGsS0VtidHf-R3",
    "publishedAt": "2023-11-18T17:04:00.680937Z",
    "title": "Live",
    "description": "",
    "url": "https://i.ytimg.com/vi/wEvde2UJxFc/hqdefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 4,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Join live interactive coding sessions, Q&As, and insightful discussions.",
    "category": [
      "Live Coding",
      "Q&A Sessions"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFtnk5Q1yLlvXLXp67lYRzp4",
    "publishedAt": "2023-11-06T16:43:33.065297Z",
    "title": "Strings in C++",
    "description": "",
    "url": "https://i.ytimg.com/vi/FkaIZAQKmWU/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 10,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Explore string manipulation and common string problems in C++ now.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFvnTO2VcpgfTy4Bi3Ry2-P7",
    "publishedAt": "2023-10-21T14:26:11.53417Z",
    "title": "Motivation",
    "description": "",
    "url": "https://i.ytimg.com/vi/nobVMCaOe9o/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 10,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Boost your drive and achieve your goals with these motivational insights.",
    "category": [
      "Career Growth",
      "Personal Development"
    ],
    "difficulty": "General"
  },
  {
    "id": "PLQEaRBV9gAFtNvVYbxfB_k9AOV1pXrbwy",
    "publishedAt": "2023-10-16T23:41:41.202113Z",
    "title": "Binary Search Playlist in C++",
    "description": "Binary Search in C++\nBinary Search\nTheory of Binary Search",
    "url": "https://i.ytimg.com/vi/0Hwpzd-bSck/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 6,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Learn Binary Search algorithm and its theory with C++ examples.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFsR-DKs0cb9Y-1uJ43Jrvqa",
    "publishedAt": "2023-10-11T23:43:22.100908Z",
    "title": "Sorting Algorithm in C++ [Theory+Code]",
    "description": "Selection Sort\nInsertion sort\nBubble Sort\nQuick Sort\nMerge Sort",
    "url": "https://i.ytimg.com/vi/9_B6TmAHveU/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 5,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Master various sorting algorithms with theory and C++ code examples.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFt9PSB_2HRSQ0CE-nl5AxS3",
    "publishedAt": "2023-10-11T00:20:38.701878Z",
    "title": "Time and Space Complexity Complete Detail",
    "description": "Time and Space Complexity in C++\nTime and Space Complexity for Beginner\nTime and Space Complexity from Zero to advance",
    "url": "https://i.ytimg.com/vi/hUdqNPhXOh4/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 1,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Detailed guide to Time and Space Complexity analysis for algorithms.",
    "category": [
      "Algorithm Analysis",
      "Computer Science Fundamentals"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFvh2mVVhsph6OiemIHtp3r-",
    "publishedAt": "2023-10-09T23:04:11.285234Z",
    "title": "Arrays in C++",
    "description": "What is an Array\nArrays in c++\nIntroduction to array in c++\nCoder Army Arrays\nSearch in an array\nBinary search\n\nBasic of Arrays\nAll about array in one shot",
    "url": "https://i.ytimg.com/vi/moZNKL37w-s/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 20,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Understand arrays in C++, searching, and basic operations in detail.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "Beginner"
  },
  {
    "id": "PLQEaRBV9gAFvuWuc7fiSLxB5-otDULSCX",
    "publishedAt": "2023-09-29T17:02:12.30593Z",
    "title": "Complete Pattern Print Problem",
    "description": "Triangle print\npyramid print\ndiamond Print\nHard Pattern print\nTrick to solve pattern print",
    "url": "https://i.ytimg.com/vi/0LawAwK5OaI/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 4,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Learn tricks to solve various pattern printing problems using C++.",
    "category": [
      "Data Structures & Algorithms",
      "Problem Solving",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01",
    "publishedAt": "2023-09-17T20:27:44.38542Z",
    "title": "DSA Playlist in C++",
    "description": "DSA full course in Hindi playlist  \nDSA  complete playlist in c++ \nFree DSA Course\nC++ for beginner to Advance level.\nComplete DSA Course in C++\nCoder Army DSA Course\nDSA in 2023\nDSA Best playlist\nDSA with C++\nDSA by Rohit Negi\nDSA in C++\nDSA Rohit Negi\nBAAP of All DSA course\n180 Hard\n180 Days of Code\nRohit Negi DSA\nDSA Course in Hindi\nDSA in JAVA\nDSA in Python",
    "url": "https://i.ytimg.com/vi/y3OOaXrFy-Q/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 163,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Your ultimate guide to Data Structures and Algorithms using C++.",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  },
  {
    "id": "PLQEaRBV9gAFsj0vi1VtpwqSeEfoIG_KSv",
    "publishedAt": "2023-08-15T03:32:37.455451Z",
    "title": "Dsa full course in hindi playlist",
    "description": "Data Structure and Algorithm\nDSA in C++\nComplete DSA by Rohit Negi\nCoder Army DSA",
    "url": "https://i.ytimg.com/vi/moZNKL37w-s/sddefault.jpg",
    "channelTitle": "Coder Army",
    "itemCount": 148,
    "istructorName": "Rohit Negi",
    "instructorProfileImageUrl": "https://yt3.ggpht.com/L5V_uwm8Dg7o40NU9gQ_c-r3TC6dkMxVil0fBG_N_wYnnSaHZc1dVYNlRNUy4U1gd5ViZR9V=s240-c-k-c0x00ffffff-no-rj",
    "isFree": true,
    "price": null,
    "tagline": "Complete Data Structures and Algorithms (DSA) course in Hindi (C++).",
    "category": [
      "C++",
      "Data Structures & Algorithms",
      "Programming"
    ],
    "difficulty": "All Levels"
  }
]

// Theme key
export const THEME_STORAGE_KEY = 'hackforge-theme';

// Chart/Color constants
export const PIE_CHART_COLORS = {
  Easy: '#4CAF50',
  Medium: '#FFC107',
  Hard: '#F44336',
};

export const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300',
};

export const DAILY_PROBLEMS_CHART_COLORS = {
  easy: '#4CAF50',
  hard: '#F44336',
  medium: '#FF9800',
  basic: '#60A5FA',
};

export const HEATMAP_COLORS = [
  'bg-slate-100 dark:bg-slate-700',
  'bg-green-200 dark:bg-green-800/70',
  'bg-green-400 dark:bg-green-600/70',
  'bg-green-600 dark:bg-green-400/70',
  'bg-green-800 dark:bg-green-200/70',
];

export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const topicsData = [
  "All Tags",
  "strings",
  "arrays",
  "linked-list",
  "stacks",
  "queues",
  "hash-maps",
  "sorting",
  "searching",
  "binary-search",
  "graphs",
  "trees",
  "dynamic-programming",
  "backtrack",
  "greedy",
  "heap",
  "bit-manipulation",
  "mathematical",
  "two-pointers",
  "sliding-window",
  "recursion",
  "design",
  "math",
  "other"
]

export const difficulties = [
  "All Difficulties",
  "Basic",
  "Easy",
  "Medium",
  "Hard"
] 

export const statuses = [
  "All Statuses",
  "Solved",
  "Attempted",
  "To Do"
]

export const PODIUM_COLORS = {
  gold: 'text-yellow-500 dark:text-yellow-400',
  silver: 'text-slate-500 dark:text-slate-400',
  bronze: 'text-orange-500 dark:text-orange-400',
};

export const profileDropdownSection = [
  { label: 'My Profile', key: 'profile' },
  { label: 'My Problems', key: 'myProblems' },
  { label: 'My Sprints', key: 'mySprints' },
  { label: 'My Submissions', key: 'submissions' },
  { label: 'Account', key: 'account' },
];

export const defaultProfileImageUrl = "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg";

