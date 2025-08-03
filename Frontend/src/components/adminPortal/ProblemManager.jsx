import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

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

const ProblemManager = () => {
  const navigate = useNavigate();
  const { data } = useOutletContext();
  const [problems, setProblems] = useState(data.problems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);


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
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Problem Library</h2>
          <button
            onClick={() => navigate('create-new')}
            className="flex items-center space-x-2 bg-[#F97316] hover:bg-[#FB923C] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusCircle size={20} />
            <span>Add New Problem</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Prob No.</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Difficulty</th>
                <th className="px-6 py-4 font-semibold">Tags</th>
                <th className="px-6 py-4 font-semibold">Created At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
                >
                  <td className="px-5 py-4 text-base font-medium text-slate-600 dark:text-gray-100 cursor-pointer transition-colors">
                    {problem.problemNo}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{problem.title}</td>
                  <td className="px-6 py-4">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{problem.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`edit/${problem._id}`)}
                      className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(problem._id)}
                      className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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

export default ProblemManager;
