import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  IconEdit,
  IconGoogle,
  IconGitHub,
  IconVerified,
  IconNotVerified,
  IconUserCircle,
  IconEnvelope,
  IconIdentification,
  IconLink,
  IconLock,
  IconTrash,
  IconChevronDown,
  IconChevronUp,
  IconCamera,
} from '../components/Icons/AccountPageIcons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosClient from '../config/axios';
import { updateUserProfile, updateUserProfileImage } from '../slices/authSlice';
import toast from 'react-hot-toast';


const Section = ({ title, children, initiallyOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
      <button
        className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 border-b border-slate-200 dark:border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        {isOpen ? (
          <IconChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        ) : (
          <IconChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div id={`section-content-${title.replace(/\s+/g, '-').toLowerCase()}`} className="p-6 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
};

const ConnectionButton = ({ serviceName, IconComponent, connected, onConnect, onDisconnect, connectedEmail }) => (
  <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-transparent">
    <div className="flex items-center">
      <IconComponent className="w-6 h-6 mr-3 text-slate-700 dark:text-slate-200" />
      <span className="font-medium text-slate-800 dark:text-slate-100">{serviceName}</span>
    </div>
    {connected ? (
      <div className="text-right">
        {connectedEmail && <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{connectedEmail}</p>}
        <button
          onClick={onDisconnect}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                     text-red-600 hover:text-red-700 bg-transparent border border-red-500 hover:border-red-600 hover:bg-red-50
                     dark:text-red-400 dark:hover:text-red-300 dark:border-red-400 dark:hover:border-red-300 dark:hover:bg-red-400/10"
        >
          Disconnect
        </button>
      </div>
    ) : (
      <button
        onClick={onConnect}
        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md flex items-center transition-colors"
      >
        <IconLink className="w-4 h-4 mr-2" /> Connect
      </button>
    )}
  </div>
);

const AccountPage = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
  const [isEmailVerified, setIsEmailVerified] = useState(user?.emailVerified);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false);
  const [loadingEmailVerification, setLoadingEmailVerification] = useState(false);
  const [loadingSaveProfile, setLoadingSaveProfile] = useState(false);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // useForm setup with validation and mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: user?.fullName || '',
      username: user?.username || '',
      emailId: user?.emailId || '',
    },
  });

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImageFile(file); // store the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result); // show preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!newProfileImageFile) return;
    setUploadingImage(true);
    try {
      const signatureResponse = await axiosClient.get('/profile/image/upload');
      const { signature, timestamp, public_id, api_key, upload_url } = signatureResponse.data;

      const fd = new FormData();
      fd.append("file", newProfileImageFile);
      fd.append("signature", signature);
      fd.append("timestamp", timestamp);
      fd.append("public_id", public_id);
      fd.append("api_key", api_key);
      
      const uploadResponse = await axios.post(upload_url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const cloudinaryResult = uploadResponse.data;

      const metadataResponse = await axiosClient.patch('/profile/image/save', {
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url
      });

      const updatedProfileImageUrl = metadataResponse.data.profileImageUrl;
      dispatch(updateUserProfileImage({ profileImageUrl: updatedProfileImageUrl }));
      setNewProfileImageFile(null); // reset after success
      setUploadingImage(false);
      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error(error);
      setUploadingImage(false);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleCancel = () => {
    reset(); // reset fields to original
    setIsEditingProfile(false);
  };

  const onSubmit = async (data) => {
    setLoadingSaveProfile(true);
    try {

      const response = await axiosClient.patch("profile/update", data );
      const updatedUser = response.data.user;
      dispatch(updateUserProfile(updatedUser));
      setLoadingSaveProfile(false);
      setIsEditingProfile(false);
      reset(updatedUser); // mark as pristine
      toast.success("Profile updated successfully!");

    } catch ( error ) {

      console.log(error);

      if(error.status === 409)
        toast.error(error.response.data.message);
      else
        toast.error("Failed to update profile. Please try again.");
      setLoadingSaveProfile(false);

    }
  };

  const handleVerifyEmail = async () => {
    setLoadingEmailVerification(true);
    try {
      await axiosClient.get('/authentication/verify-email/initialize');
      setIsVerificationLinkSent(true);
      setLoadingEmailVerification(false);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoadingEmailVerification(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center sm:text-left">
        Account Settings
      </h1>

      {/* PROFILE SECTION */}
      <Section title="Profile Information" initiallyOpen={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 mb-3">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-slate-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-slate-300 dark:border-slate-600">
                  <IconUserCircle className="w-16 h-16 text-slate-400 dark:text-slate-500" />
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg, image/svg"
              className="hidden"
              id="profilePictureInput"
            />

            {newProfileImageFile ? (
              // When new image is selected -> show upload button
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={uploadingImage}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-colors
                          text-green-600 hover:text-green-700 border-green-500 hover:border-green-600 bg-white hover:bg-green-50
                          dark:text-green-500 dark:hover:text-green-400 dark:border-green-500 dark:hover:border-green-400 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {uploadingImage ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <IconCamera className="w-4 h-4 mr-2" />
                    Upload Image
                  </>
                )}
              </button>
            ) : (
              // Default button when no new image is selected
              <button
                type="button"
                onClick={triggerFileSelect}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-colors
                          text-orange-600 hover:text-orange-700 border-orange-500 hover:border-orange-600 bg-white hover:bg-orange-50
                          dark:text-orange-500 dark:hover:text-orange-400 dark:border-orange-500 dark:hover:border-orange-400 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                <IconCamera className="w-4 h-4 mr-2" />
                Change Photo
              </button>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
              <IconUserCircle className="w-5 h-5 mr-3 text-orange-500" />
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</label>
            </div>
            <div className="flex-grow text-slate-900 dark:text-white">
              {isEditingProfile ? (
                <input
                  type="text"
                  disabled={loadingSaveProfile}
                  {...register('fullName')}
                  className="w-full px-3 py-2 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 "
                />
              ) : (
                <span>{user?.fullName}</span>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-200 dark:border-slate-700 ">
            <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
              <IconIdentification className="w-5 h-5 mr-3 text-orange-500" />
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Username</label>
            </div>
            <div className="flex-grow text-slate-900 dark:text-white">
              {isEditingProfile ? (
                <>
                  <input
                    type="text"
                    disabled={loadingSaveProfile}
                    {...register('username', {
                      required: 'Username cannot be empty',
                      minLength: {
                        value: 4,
                        message: 'Username must be at least 4 characters',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Username cannot be more than 20 characters',
                      },
                    })}
                    className="w-full px-3 py-2 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
                </>
              ) : (
                <span>{user?.username}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
              <IconEnvelope className="w-5 h-5 mr-3 text-orange-500" />
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
            </div>
            <div className="flex-grow text-slate-900 dark:text-white">
              {isEditingProfile ? (
                <>
                  <input
                    type="email"
                    disabled={loadingSaveProfile}
                    {...register('emailId', { required: 'Email cannot be empty' })}
                    className="w-full px-3 py-2 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                  />
                  {errors.emailId && <p className="mt-1 text-sm text-red-500">{errors.emailId.message}</p>}
                </>
              ) : (
                <span>{user?.emailId}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditingProfile ? (
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                           text-slate-700 bg-slate-200 hover:bg-slate-300
                           dark:text-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid || !isDirty || loadingSaveProfile}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loadingSaveProfile ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          ) : (
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 text-sm font-medium flex items-center"
              >
                <IconEdit className="w-4 h-4 mr-1" /> Edit
              </button>
            </div>
          )}
        </form>
      </Section>

      {/* EMAIL VERIFICATION */}
      <Section title="Email Verification">
        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-transparent">
          <div className="flex items-center">
            {isEmailVerified ? (
              <>
                <IconVerified className="w-6 h-6 mr-3 text-green-500 dark:text-green-400" />
                <span className="font-medium text-green-600 dark:text-green-400">Email Verified</span>
              </>
            ) : (
              <>
                <IconNotVerified className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
                <span className="font-medium text-yellow-600 dark:text-yellow-400">Email Not Verified</span>
              </>
            )}
          </div>
          {!isEmailVerified && (
            <button
              onClick={handleVerifyEmail}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors disabled:opacity-50"
              disabled={loadingEmailVerification}
            >
              {loadingEmailVerification ? 'Sending...' : isVerificationLinkSent ? 'Resend Verification Email' : 'Send Verification Email'}
            </button>
          )}
        </div>
        {!isEmailVerified && isVerificationLinkSent && (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please check your inbox for a verification link. If you haven't received it, you can resend the email.
          </p>
        )}
      </Section>

      {/* CONNECTED ACCOUNTS */}
      <Section title="Connected Accounts">
        <div className="space-y-4">
          <ConnectionButton
            serviceName="Google"
            IconComponent={IconGoogle}
            connected={googleConnected}
            onConnect={() => {
              alert('Connect with Google clicked');
              setGoogleConnected(true);
            }}
            onDisconnect={() => {
              alert('Disconnect Google clicked');
              setGoogleConnected(false);
            }}
            connectedEmail={googleConnected ? user?.emailId : undefined}
          />
          <ConnectionButton
            serviceName="GitHub"
            IconComponent={IconGitHub}
            connected={githubConnected}
            onConnect={() => {
              alert('Connect with GitHub clicked');
              setGithubConnected(true);
            }}
            onDisconnect={() => {
              alert('Disconnect GitHub clicked');
              setGithubConnected(false);
            }}
            connectedEmail={githubConnected ? user?.username : undefined}
          />
        </div>
      </Section>

      {/* SECURITY */}
      <Section title="Security">
        <div className="space-y-4">
          <button
            onClick={() => {alert("Service currently unavailable, Please try again later.")}}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start px-6 py-3 text-sm font-medium rounded-md transition-colors
                             text-slate-700 bg-slate-200 hover:bg-slate-300
                             dark:text-white dark:bg-slate-600 dark:hover:bg-slate-500"
          >
            <IconLock className="w-5 h-5 mr-2" /> Change Password
          </button>
          <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-transparent">
            <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-1">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Add an extra layer of security to your account.</p>
            <button
              onClick={() => {alert("Service currently unavailable, Please try again later.")}}
              className="px-4 py-2 text-sm font-medium rounded-md border transition-colors
                               text-slate-700 border-slate-400 hover:bg-slate-200
                               dark:text-slate-300 dark:border-slate-500 dark:hover:bg-slate-600"
            >
              Set Up 2FA
            </button>
          </div>
        </div>
      </Section>

      {/* ACCOUNT MANAGEMENT */}
      <Section title="Account Management">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              alert('Account deletion requested.');
            }
          }}
          className="w-full sm:w-auto flex items-center justify-center sm:justify-start px-6 py-3 text-sm font-medium rounded-md transition-colors
                     text-red-600 hover:text-red-700 border border-red-500 hover:border-red-600 hover:bg-red-50
                     dark:text-red-400 dark:hover:text-red-300 dark:border-red-400 dark:hover:bg-red-400/10"
        >
          <IconTrash className="w-5 h-5 mr-2" /> Delete Account
        </button>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          Permanently delete your account and all associated data. This action is irreversible.
        </p>
      </Section>
    </div>
  );
};

export default AccountPage;
