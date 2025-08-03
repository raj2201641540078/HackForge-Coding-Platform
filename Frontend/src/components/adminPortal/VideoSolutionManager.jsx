import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import { useEffect } from 'react';

const DifficultyBadge = ({ difficulty }) => {
  const colorClasses = {
    Basic: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[difficulty]}`}>
      {difficulty}
    </span>
  );
};

const VideoSolutionManager = () => {
  const navigate = useNavigate();
  const { data } = useOutletContext();
  const [problems, setProblems] = useState([]);
  const [problemsWithVideoSolutions, setproblemsWithVideoSolutions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [selectedOption, setSelectedOption] = useState("add");

  useEffect(() => {
    const problemHasSoln = {}
    for(const soln of data.videoSolutions) {
      problemHasSoln[soln.problem._id] = true;
    }

    const filteredProblems = data.problems.filter((p) => !problemHasSoln[p._id]);

    setProblems(filteredProblems);
    setproblemsWithVideoSolutions(data.videoSolutions);
  },[])

  const openDeleteModal = (problemId) => {
    setProblemToDelete(problemId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProblemToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteProblem = () => {
    if (!problemToDelete) return;
    setProblems(problems.filter((p) => p.id !== problemToDelete));
    closeDeleteModal();
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Video Solutions</h2>
          <div
            className="
              relative flex w-full max-w-sm rounded-lg p-1
              bg-gray-100 border border-gray-300
              dark:bg-gray-800 dark:border-gray-700
            "
          >
            {/* Sliding indicator */}
            <div
              className={`
                absolute top-1 bottom-1 w-[48%] rounded-lg transition-all duration-300  bg-orange-500
                ${selectedOption === "add"
                  ? "left-1"
                  : "left-[51%]"}
              `}
            ></div>

            {/* Add button */}
            <button
              onClick={() => setSelectedOption("add")}
              className={`
                z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
                ${selectedOption === "add"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
              `}
            >
              Add Solution
            </button>

            {/* Delete button */}
            <button
              onClick={() => setSelectedOption("delete")}
              className={`
                z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
                ${selectedOption === "delete"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
              `}
            >
              Delete Solution
            </button>
          </div>
        </div> 
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Difficulty</th>
                <th className="px-6 py-4 font-semibold">Tags</th>
                <th className="px-6 py-4 font-semibold">Created At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            {selectedOption === "add" &&
              <tbody>
                {problems.map((problem) => (
                  <tr
                    key={problem._id}
                    className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{problem.title}</td>
                    <td className="px-6 py-4">
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </td>
                    <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
                      {problem.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{problem.createdAt.split('T')[0]}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`upload/${problem._id}`)}
                        className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <PlusCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
            {selectedOption === "delete" &&
              <tbody>
                {problemsWithVideoSolutions.map((soln) => (
                  <tr
                    key={soln._id}
                    className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{soln.problem.title}</td>
                    <td className="px-6 py-4">
                      <DifficultyBadge difficulty={soln.problem.difficulty} />
                    </td>
                    <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
                      {soln.problem.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{soln.createdAt.split('T')[0]}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/problems/edit/${soln.problem._id}`)}
                        className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(soln.problem._id)}
                        className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProblem}
        title="Delete Problem"
        message="Are you sure you want to delete this problem? This action is permanent and cannot be undone."
      />
    </>
  );
};

export default VideoSolutionManager;
