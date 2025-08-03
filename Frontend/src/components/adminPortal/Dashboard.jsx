import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { PlusSquare, ListTodo, Users, BarChart2, CheckCircle, Clock, XCircle, Video } from 'lucide-react';
import { getProcessedStatus, getTimeStamp } from '../../utils/heplerFunctions';

const StatCard = ({ title, value, icon, gradient }) => (
  <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] flex items-center space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    <div className={`${gradient} p-4 rounded-full text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{title}</p>
      <p className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ to, title, description, icon }) => (
  <Link
    to={to}
    className="block bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] hover:border-[#F97316] dark:hover:border-[#F97316] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="flex items-center space-x-4 mb-2">
      <div className="p-3 bg-[#F97316]/10 dark:bg-[#F97316]/20 rounded-lg text-[#F97316]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h3>
    </div>
    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{description}</p>
  </Link>
);

const RecentSubmissionItem = ({ title, user, status, time }) => (
  <div className="flex items-center justify-between p-3 hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 rounded-lg">
    <div className="flex items-center space-x-3">
      {status === 'Accepted' ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <XCircle className="text-red-500" size={20} />
      )}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{user}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-semibold text-sm ${status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{time}</p>
    </div>
  </div>
);

const Dashboard = () => {

  const { data } = useOutletContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-1 text-[#0F172A] dark:text-[#F8FAFC]">Welcome back, Admin!</h2>
        <p className="text-[#64748B] dark:text-[#94A3B8]">Here's a quick overview of the platform's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Problems"
          value={data.noProblems}
          icon={<ListTodo size={28} />}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Total Submissions"
          value={data.noSubmissions}
          icon={<CheckCircle size={28} />}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="Active Users"
          value={data.noUsers}
          icon={<BarChart2 size={28} />}
          gradient="bg-gradient-to-br from-yellow-500 to-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard
              to="problems/create-new"
              title="Create Problem"
              description="Add a new coding challenge to the problem library."
              icon={<PlusSquare size={24} />}
            />
            <ActionCard
              to="problems"
              title="Manage Problems"
              description="View, edit, or delete existing coding challenges."
              icon={<ListTodo size={24} />}
            />
            <ActionCard
              to="users"
              title="Manage Users"
              description="View, edit, or create platform users."
              icon={<Users size={24} />}
            />
            <ActionCard
              to="video-solutions"
              title="Manage Video Solutions"
              description="Upload or delete video solutions."
              icon={<Video size={24} />}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Recent Submissions</h3>
          <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-2">
            {
              data.latestSubmissions?.map((submission) => 
                <RecentSubmissionItem key={submission._id} title={submission.problemId.title} user={submission.userId.username} status={getProcessedStatus(submission.status)} time={getTimeStamp(submission.createdAt)} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
