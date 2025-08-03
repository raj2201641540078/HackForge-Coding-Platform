import React, { useState, useMemo, useEffect } from 'react';
import { ProblemsTable, ProblemsGrid } from '../components';
import { Heart, Star, CheckCircle2, Pencil, ListTodo, LayoutGrid, List } from 'lucide-react';
import axiosClient from '../config/axios';
import LoadingPage from './LoadingPage';
import { useNavigate, useParams } from 'react-router';
import { getMappedProblems } from '../utils/heplerFunctions';

const MyProblemsPage = () => {
  const { activeTab } = useParams(); // 'all' | 'liked' | 'favorited' | 'solved' | 'attempted'
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState(null);
  const [view, setView] = useState('table'); // 'table' | 'grid'

  useEffect(() => {
    const fetchMyProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problems/user");
        const mappedProblems = getMappedProblems(data);

        setProblems(mappedProblems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

    }
    fetchMyProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    if(!problems) return null;
    
    switch (activeTab) {
      case 'liked':
          return problems.filter(p => p.isLiked);
      case 'favorites':
          return problems.filter(p => p.isFavourited);
      case 'solved':
          return problems.filter(p => p.status==="Solved");
      case 'attempted':
          return problems.filter(p => p.status==="Attempted");
      case 'all':
      default:
          return problems;
    }
  }, [activeTab, problems]);

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => navigate(`/my-problems/${tabName}`)}
      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
        activeTab === tabName
          ? 'bg-[#f97316] text-white'
          : 'text-[#475569] dark:text-[#94a3b8] hover:bg-[#ffffff] dark:hover:bg-[#232b3b]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const ViewSwitcher = () => (
    <div className="p-1.5 bg-[#f8fafc] dark:bg-[#1a2332] border border-[#e2e8f0] dark:border-[#334155] rounded-lg flex items-center space-x-1">
      <button
        aria-label="Table view"
        onClick={() => setView('table')}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          view === 'table'
            ? 'bg-[#f97316] text-white'
            : 'text-[#475569] dark:text-[#94a3b8] hover:bg-[#ffffff] dark:hover:bg-[#232b3b]'
        }`}
      >
        <List size={16} />
      </button>
      <button
        aria-label="Grid view"
        onClick={() => setView('grid')}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          view === 'grid'
            ? 'bg-[#f97316] text-white'
            : 'text-[#475569] dark:text-[#94a3b8] hover:bg-[#ffffff] dark:hover:bg-[#232b3b]'
        }`}
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  );

  if(loading || !problems) return <LoadingPage />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3b4655] dark:text-white">My Problems</h1>
      <p className="text-lg text-[#475569] dark:text-[#94a3b8] mb-8">
        Track your progress and manage your challenges.
      </p>

      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="p-1.5 bg-[#f8fafc] dark:bg-[#1a2332] border border-[#e2e8f0] dark:border-[#334155] rounded-lg flex items-center justify-start space-x-2 flex-wrap">
          <TabButton tabName="all" label="All Problems" icon={<ListTodo size={16} />} />
          <TabButton tabName="liked" label="Liked" icon={<Heart size={16} />} />
          <TabButton tabName="favorited" label="Favorited" icon={<Star size={16} />} />
          <TabButton tabName="solved" label="Solved" icon={<CheckCircle2 size={16} />} />
          <TabButton tabName="attempted" label="Attempted" icon={<Pencil size={16} />} />
        </div>
        <ViewSwitcher />
      </div>

      {view === 'grid' ? (
        <ProblemsGrid problems={filteredProblems} />
      ) : (
        <div className="bg-[#ffffff] dark:bg-[#232b3b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden">
          <ProblemsTable problems={filteredProblems} />
        </div>
      )}
    </div>
  );
};

export default MyProblemsPage;
