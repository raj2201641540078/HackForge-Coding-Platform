import React, {useMemo} from 'react';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';
import { useNavigate, useParams, useOutletContext, NavLink } from 'react-router';
import Icon from '../shared/Icon';

const getStatusIcon = (status) => {
  switch (status) {
    case 'Solved':
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-green-600 dark:text-green-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "Solved" }}
        />
      );
    case 'Attempted':
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "Attempted" }}
        />
      );
    case 'Todo':
    default:
      return (
        <Icon
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
          pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
          className="w-5 h-5 text-slate-400 dark:text-gray-500"
          viewBox="0 0 20 20"
          isOutline={false}
          svgProps={{ "aria-label": "To Do" }}
        />
      );
  }
};

const SprintDetail = () => {
  const { sprints } = useOutletContext();
  const navigate = useNavigate();
  const { sprintName } = useParams();

  const sprint = useMemo(() => {
    if(!sprintName) return null;

    return sprints.find((sp) => sp.sprintName === sprintName);

  }, [sprintName]);

  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400',
    Medium: 'bg-yellow-500/10 text-yellow-400',
    Hard: 'bg-red-500/10 text-red-400',
  };

  if(!sprint) return <div>No sprint exists with the given name</div>

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15'>
        <button
          onClick={() => navigate('/my-sprints')}
          className="flex items-center space-x-2 text-sm font-semibold text-[#475569] dark:text-[#94a3b8] hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Sprints</span>
        </button>

      <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            {sprint.sprintName}
          </h1>
          <span
            className={`flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              sprint.isPublic
                ? 'bg-blue-500/10 text-blue-400'
                : 'bg-gray-500/10 text-gray-400'
            }`}
          >
            {sprint.isPublic ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{sprint.isPublic ? 'Public' : 'Private'}</span>
          </span>
        </div>
        {/* <button className="bg-[#f97316] text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
          Start Sprint
        </button> */}
      </div>
      <p className="text-lg text-[#475569] dark:text-[#94a3b8] mb-10 max-w-3xl">
        {sprint.description}
      </p>

      <h2 className="text-2xl font-bold mb-5 text-[#3b4655] dark:text-[#e2e8f0]">Problems in this Sprint</h2>
      <div className="bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#475569] dark:text-[#94a3b8]">
            <thead className="text-xs text-[#475569] dark:text-[#94a3b8] uppercase bg-[#f8fafc] dark:bg-[#1a2332]">
              <tr>
                <th scope="col" className="px-6 py-4 w-16">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-4">
                  Tags
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sprint.problems.map((problem) => {
                return (
                  <tr
                    key={problem._id}
                    className="border-b border-[#e2e8f0] dark:border-[#334155] hover:bg-[#f8fafc] dark:hover:bg-[#1a2332]/50"
                  >
                    <td className="px-6 py-4" title={problem.status || 'To Do'}>
                      {getStatusIcon(problem.status)}
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-[#1e293b] dark:text-[#e2e8f0] whitespace-nowrap"
                    >
                      <NavLink
                        to={`/problems/${problem._id}`}
                        className="hover:text-[#f97316] transition-colors"
                      >
                        {problem.title}
                      </NavLink>
                    </th>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyStyles[problem.difficulty]}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-200/50 dark:bg-gray-700/50 px-2 py-0.5 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/problems/${problem._id}`)}
                        className="font-semibold py-1 px-3 rounded-md border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                                  text-orange-600 hover:text-orange-700 border-orange-500 hover:border-orange-600 hover:bg-orange-50 dark:text-orange-500 dark:hover:text-orange-400 dark:border-orange-500 dark:hover:border-orange-400 dark:hover:bg-orange-500/10
                                  focus:ring-orange-500 dark:focus:ring-orange-400 cursor-pointer"
                        aria-label={`View problem: ${problem.title}`}
                      >
                        View Problem
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SprintDetail;
