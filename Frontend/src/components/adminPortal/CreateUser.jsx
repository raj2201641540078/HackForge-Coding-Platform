import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';

const CreateUser = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log({ email: data.email, password: data.password, role: data.role });
    alert('User created! Check the console for the data.');
    navigate('/users');
  };

  const inputBaseClasses =
    "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses =
    "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-[#F97316]/20 to-[#EA580C]/20 rounded-full mb-4">
            <UserPlus size={32} className="text-[#F97316]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Create a New User</h2>
          <p className="text-[#64748B] dark:text-[#94A3B8] mt-1">
            Fill in the details to add a new user to the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className={inputBaseClasses}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                className={inputBaseClasses}
                placeholder="Enter a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B] dark:text-[#94A3B8] hover:text-[#F97316] transition-colors duration-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className={labelClasses}>Role</label>
            <select id="role" {...register('role')} className={inputBaseClasses}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Action Buttons */}
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
              className="w-full group flex justify-center items-center space-x-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Create User Account</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
