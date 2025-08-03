import { MOCK_PROBLEMS, TOPICS_LIST, DIFFICULTY_LEVELS, STATUS_FILTER_OPTIONS } from '../utils/constants';

// Simulate API delay
const API_DELAY = 500;

export const fetchProblems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROBLEMS);
    }, API_DELAY);
  });
};

export const getTopics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TOPICS_LIST);
    }, API_DELAY / 2);
  });
};

export const getDifficultyLevels = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DIFFICULTY_LEVELS);
    }, API_DELAY / 2);
  });
};

export const getProblemStatusFilters = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATUS_FILTER_OPTIONS);
    }, API_DELAY / 2);
  });
};
