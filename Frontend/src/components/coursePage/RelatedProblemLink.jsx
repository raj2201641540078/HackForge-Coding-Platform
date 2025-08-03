import React from 'react';
import { Link } from 'react-router';
import { APP_ROUTES } from '../../utils/constants'
import { PuzzlePieceIcon } from '../Icons/CoursesPageIcons';


const RelatedProblemLink = ({ problemId, problemTitle }) => {
  const problemUrl = APP_ROUTES.problemView.replace(':problemId', problemId);
  // Mock: In a real app, you might fetch problemTitle based on problemId if not provided
  const displayTitle = problemTitle || `Problem ${problemId}`;

  return (
    <Link
      to={problemUrl}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-orange-500 transition-colors duration-200"
    >
      <PuzzlePieceIcon className="w-5 h-5 mr-2" />
      Solve: {displayTitle}
    </Link>
  );
};

export default RelatedProblemLink;