import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { MOCK_USERS } from '../data/mockData';
import { UserCog, ArrowRight } from 'lucide-react';

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    // Note: In a real app, you'd fetch this data from an API
    const userToEdit = MOCK_USERS.find(u => u.id === userId);
    if (userToEdit) {
      reset({
        email: userToEdit.email,
        role: userToEdit.role,
      });
    } else {
      alert('User not found!');
      navigate('/users');
    }
  }, [userId, navigate, reset]);

  const onSubmit = data => {
    console.log("Updated User Data:", { id: userId, ...data });
    alert('User updated! Check the console for the data.');
    navigate('/users');
  };

  const inputBaseClasses = "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses = "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-[#F97316]/20 to-orange-500/20 rounded-full mb-4">
            <UserCog size={32} className="text-[#F97316]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Edit User Account</h2>
          <p className="text-[#64748B] dark:text-[#94A3B8] mt-1">Update the user's role and details below.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`${inputBaseClasses} bg-[#FFFFFF]/50 dark:bg-[#0F172A]/50 cursor-not-allowed`}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor="role" className={labelClasses}>Role</label>
            <select
              id="role"
              {...register('role')}
              className={inputBaseClasses}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end items-center space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group flex items-center space-x-2 py-3 px-6 rounded-lg bg-gradient-to-r from-[#F97316] to-orange-500 hover:from-[#FB923C] hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Update User</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;