import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import { HackForgeLogo, InputField, SocialButton, GoogleIcon, LinkedInIcon, GithubIcon } from '../components';
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";

// Icon Paths (Heroicons)
const USER_ICON_PATH = "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z";
const ENVELOPE_ICON_PATH = "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75";
const LOCK_CLOSED_ICON_PATH = "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z";

const signupSchema = z.object({
  username: z.string().min(1, { message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),
  emailId: z.string().min(1, { message: "Email is required." })
    .email({ message: "Entered value does not match email format." }),
  password: z.string().min(1, { message: "Password is required." })
    .refine(val => val.length >= 8, {
      message: "Min 8 characters",
    })
    .refine(val => /[a-z]/.test(val), {
      message: "Must include lowercase",
    })
    .refine(val => /[A-Z]/.test(val), {
      message: "Must include uppercase",
    })
    .refine(val => /[0-9]/.test(val), {
      message: "Must include number",
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
      message: "Must include symbol",
    }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});


const SignupPage = () => {
  // for react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur' // Validate on blur
  });

  // for passwords visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const dispatch = useDispatch();

  // normal signup
  const onSubmit = (data) => {
    // Process signup data - e.g., send to an API
    dispatch(registerUser(data));
  };

  // signing with other platforms account
  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_BASE_URL}/authentication/${provider}`;
  };


  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-slate-200 dark:border-gray-700/50">
        <div className="flex flex-col items-center">
          <HackForgeLogo size={8} />
          <h2 className="mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Create Your HackForge Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-gray-400">
            Join our community and start your coding journey!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Choose a username"
            iconPath={USER_ICON_PATH}
            register={register("username")}
            error={errors.username}
          />
          <InputField
            id="emailId"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            iconPath={ENVELOPE_ICON_PATH}
            register={register("emailId")}
            error={errors.emailId}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            iconPath={LOCK_CLOSED_ICON_PATH}
            register={register("password")}
            error={errors.password}
            isPasswordField={true}
            isPasswordVisible={showPassword}
            onToggleVisibility={togglePasswordVisibility}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            iconPath={LOCK_CLOSED_ICON_PATH}
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            isPasswordField={true}
            isPasswordVisible={showConfirmPassword}
            onToggleVisibility={toggleConfirmPasswordVisibility}
          />

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <SocialButton
              providerName="Google"
              icon={<GoogleIcon className="h-5 w-5" />}
              onClick={() => handleSocialLogin('google')}
              action={'Sign up'}
            />
            <SocialButton
              providerName="GitHub"
              icon={<GithubIcon className="h-5 w-5 text-slate-800 dark:text-slate-100" />}
              onClick={() => handleSocialLogin('github')}
              action={'Sign up'}
            />
            {/* <SocialButton
              providerName="LinkedIn"
              icon={<LinkedInIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
              onClick={() => handleSocialLogin('linkedin')}
            /> */}
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;