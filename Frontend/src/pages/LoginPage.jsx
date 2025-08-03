import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import { HackForgeLogo, InputField, SocialButton, GoogleIcon, LinkedInIcon, GithubIcon } from '../components';
import { useDispatch } from 'react-redux';
import { loginUser } from "../slices/authSlice";


// Icon Paths (Heroicons)
const ENVELOPE_ICON_PATH = "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75";
const LOCK_CLOSED_ICON_PATH = "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z";

const loginSchema = z.object({
  emailId: z.string().min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." })
});

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  });

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // on Submit
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  
  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_BASE_URL}/authentication/${provider}`;
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-gray-700/50">
        <div className="flex flex-col items-center">
          <HackForgeLogo size={8} />
          <h2 className="mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back to HackForge
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-gray-400">
            Log in to continue your coding journey.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            placeholder="Enter your password"
            iconPath={LOCK_CLOSED_ICON_PATH}
            register={register("password")}
            error={errors.password}
            isPasswordField={true}
            isPasswordVisible={showPassword}
            onToggleVisibility={togglePasswordVisibility}
          />

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" className="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 focus:outline-none focus:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <SocialButton
              providerName="Google"
              icon={<GoogleIcon className="h-5 w-5" />}
              onClick={() => handleSocialLogin('google')}
            />
            <SocialButton
              providerName="GitHub"
              icon={<GithubIcon className="h-5 w-5 text-slate-800 dark:text-slate-100" />}
              onClick={() => handleSocialLogin('github')}
           />
            {/* <SocialButton
              providerName="LinkedIn"
              icon={<LinkedInIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
              onClick={() => handleSocialLogin('linkedin')}
            /> */}
          </div>
        </div>
        <p className="t-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
            Sign Up
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default LoginPage;