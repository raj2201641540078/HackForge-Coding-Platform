// Enum-like constants since there's no enum in JS
export const ProblemDifficulty = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
};

export const UserRole = {
  Admin: 'admin',
  User: 'user',
};

export const MOCK_PROBLEMS = [
  {
    id: 'p1',
    title: 'Two Sum',
    problemNo: 1,
    difficulty: ProblemDifficulty.Easy,
    tags: ['arrays', 'hash-maps'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: [
      { value: '2 <= nums.length <= 10^4' },
      { value: '-10^9 <= nums[i] <= 10^9' },
      { value: '-10^9 <= target <= 10^9' },
      { value: 'Only one valid answer exists.' },
    ],
    companies: [{ value: 'Google' }, { value: 'Amazon' }, { value: 'Facebook' }],
    hints: [
      { value: 'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.' },
      { value: 'So, maybe another way is to use a map? ' },
    ],
    starterCode: [
      {
        language: 'javascript',
        code:
          '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
      },
      {
        language: 'python',
        code:
          'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass',
      },
    ],
    referenceSolution: [
      {
        language: 'javascript',
        solutionCode:
          'var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n};',
      },
    ],
    visibleTestCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        target: '',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
    ],
    hiddenTestCases: [
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        target: '',
      },
    ],
    createdAt: '2024-07-20',
  },
  {
    id: 'p2',
    title: 'Median of Two Sorted Arrays',
    problemNo: 4,
    difficulty: ProblemDifficulty.Hard,
    tags: ['arrays', 'binary-search', 'greedy'],
    description:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).',
    constraints: [
      { value: 'nums1.length == m' },
      { value: 'nums2.length == n' },
      { value: '0 <= m <= 1000' },
      { value: '0 <= n <= 1000' },
      { value: '1 <= m + n <= 2000' },
      { value: '-10^6 <= nums1[i], nums2[i] <= 10^6' },
    ],
    companies: [{ value: 'Apple' }, { value: 'Adobe' }],
    hints: [{ value: 'Try to find a partition in the arrays.' }],
    starterCode: [
      {
        language: 'javascript',
        code:
          '/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};',
      },
    ],
    referenceSolution: [],
    visibleTestCases: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        target: '',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
    ],
    hiddenTestCases: [],
    createdAt: '2024-07-19',
  },
  {
    id: 'p3',
    title: 'Longest Substring Without Repeating Characters',
    problemNo: 3,
    difficulty: ProblemDifficulty.Medium,
    tags: ['hash-maps', 'strings', 'sliding-window'],
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    constraints: [],
    companies: [],
    hints: [],
    starterCode: [],
    referenceSolution: [],
    visibleTestCases: [],
    hiddenTestCases: [],
    createdAt: '2024-07-18',
  },
  {
    id: 'p4',
    title: 'Validate Binary Search Tree',
    problemNo: 98,
    difficulty: ProblemDifficulty.Medium,
    tags: ['trees', 'graphs', 'recursion'],
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    constraints: [],
    companies: [],
    hints: [],
    starterCode: [],
    referenceSolution: [],
    visibleTestCases: [],
    hiddenTestCases: [],
    createdAt: '2024-07-17',
  },
];

export const MOCK_USERS = [
  { id: 'u1', email: 'admin.user@hackforge.com', role: UserRole.Admin, createdAt: '2024-01-15' },
  { id: 'u2', email: 'alex.doe@example.com', role: UserRole.User, createdAt: '2024-05-20' },
  { id: 'u3', email: 'jane.smith@example.com', role: UserRole.User, createdAt: '2024-06-01' },
  { id: 'u4', email: 'sam.wilson@example.com', role: UserRole.User, createdAt: '2024-07-11' },
  { id: 'u5', email: 'chris.green@example.com', role: UserRole.User, createdAt: '2024-07-18' },
];
