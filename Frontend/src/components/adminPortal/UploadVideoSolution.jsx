import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useOutletContext } from "react-router";
import {
  UploadCloud,
  ArrowLeft,
  Video,
  Loader2,
  Tag,
  Calendar,
  BarChart2,
  Puzzle,
  AlertCircle,
  FileVideo,
  Info,
  X
} from "lucide-react";
import axios from "axios";
import axiosClient from "../../config/axios";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

const DifficultyBadge = ({ difficulty }) => {
  const styles = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
};

const UploadVideoSolution = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { data } = useOutletContext();

  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [showPreview, setShowPreview] = useState(false); // added state for preview

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: { videoFile: null },
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      if (data && data.problems) {
        const found = data.problems.find((p) => p._id === problemId);
        if (found) {
          setProblem(found);
          setFetchError(null);
        } else {
          setFetchError(`Problem with ID #${problemId} not found.`);
        }
      } else {
        setFetchError("Problem data is not available yet.");
      }
    } catch (err) {
      setFetchError("An error occurred while loading problem details.");
    } finally {
      setIsLoading(false);
    }
  }, [problemId]);

  const videoFile = watch("videoFile");

  const onSubmit = async (formData) => {
    const file = formData.videoFile[0];
    setUploading(true);
    setUploadProgress(0);
    clearErrors();
    setUploadedVideo(null);

    try {
      const signatureResponse = await axiosClient.get(
        `/solution-video/upload/${problemId}`
      );
      const { signature, timestamp, public_id, api_key, upload_url } =
        signatureResponse.data;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("signature", signature);
      fd.append("timestamp", timestamp);
      fd.append("public_id", public_id);
      fd.append("api_key", api_key);

      const uploadResponse = await axios.post(upload_url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;
      console.log(cloudinaryResult);

      const metadataResponse = await axiosClient.post(`/solution-video/save/${problemId}`, {
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      reset();
      setUploadProgress(0);
      setShowPreview(false);
    } catch (err) {
      console.error("Upload error:", err);
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Upload failed. Try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Problem Details...
          </p>
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
            An Error Occurred
          </p>
          <p className="text-gray-600 dark:text-gray-400">{fetchError}</p>
        </div>
      );
    }

    if (problem) {
      return (
        <>
          {/* Problem Info */}
          <div className="mb-8 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Puzzle className="mr-3 h-6 w-6 text-orange-500" />
              {problem.problemNo}. {problem.title}
            </h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Difficulty:</span>
                  <span className="ml-2">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="font-medium">Created:</span>
                  <span className="ml-2">
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <Tag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                <span className="font-medium flex-shrink-0 mr-2">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Upload Video
            </label>

            <div
              onDragEnter={() => setDragOver(true)}
              onDragLeave={() => setDragOver(false)}
              onDrop={() => setDragOver(false)}
              className={`mt-1 flex justify-center px-6 py-8 border-2 rounded-lg border-dashed transition-colors ${
                dragOver
                  ? "border-orange-400 bg-orange-50 dark:bg-orange-500/10"
                  : "border-gray-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500"
              }`}
            >
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="videoFile"
                    className="relative cursor-pointer rounded-md font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500 dark:focus-within:ring-offset-slate-800"
                  >
                    <span>Choose a file</span>
                    <input
                      id="videoFile"
                      type="file"
                      className="sr-only"
                      accept="video/mp4,video/webm"
                      {...register("videoFile", {
                        required: "A video file is required.",
                        validate: {
                          acceptedFormats: (files) =>
                            ["video/mp4", "video/webm"].includes(
                              files[0]?.type
                            ) || "Only MP4 or WebM formats are accepted.",
                          maxSize: (files) =>
                            files[0]?.size < 100000000 ||
                            "File size must be less than 100MB.",
                        },
                      })}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-500">
                  MP4, WebM up to 100MB
                </p>
              </div>
            </div>

            {videoFile?.[0] && (
              <div className="mt-4 flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg relative">
                <div className="flex items-center">
                  <FileVideo className="mr-3 h-6 w-6 text-gray-500 dark:text-slate-400" />
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate max-w-[180px]">
                    {videoFile[0].name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview((prev) => !prev)}
                  className="ml-3 px-3 py-1 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  {showPreview ? "Hide Preview" : "Preview"}
                </button>

                {showPreview && videoFile?.[0] && (
                  <div className="fixed top-4 right-4 z-50 bg-black/90 rounded-lg shadow-2xl p-3 w-80 max-h-[90vh] flex flex-col">
                    {/* Close button */}
                    <button
                      onClick={() => setShowPreview(false)}
                      className="self-end mb-2 text-white hover:text-red-400 transition-colors"
                      title="Close Preview"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Video preview */}
                    <video
                      src={URL.createObjectURL(videoFile[0])}
                      controls
                      className="w-full h-auto rounded-md"
                      style={{ maxHeight: "75vh" }}
                    />
                  </div>
                )}
              </div>
            )}

            <ErrorMessage message={errors.videoFile?.message} />

            {/* Progress UI */}
            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading...
                  </span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="pt-6 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                style={{ minHeight: "48px" }}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition duration-150"
              >
                {isSubmitting || uploading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Video className="mr-2 h-5 w-5" />
                    Submit Solution
                  </>
                )}
              </button>

              {errors.root && (
                <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {errors.root.message}
                  </p>
                </div>
              )}
            </div>
          </form>

          {uploadedVideo && (
            <div className="mt-8 p-5 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700">
              <h3 className="text-lg font-bold flex items-center text-green-700 dark:text-green-300 mb-3">
                <Info className="mr-2 h-5 w-5" />
                Video Uploaded Successfully!
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  <span className="font-medium">Public ID:</span>{" "}
                  {uploadedVideo.cloudinaryPublicId}
                </li>
                <li>
                  <span className="font-medium">Secure URL:</span>{" "}
                  <a
                    href={uploadedVideo.secureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 dark:text-orange-400 underline"
                  >
                    {uploadedVideo.secureUrl}
                  </a>
                </li>
                <li>
                  <span className="font-medium">Duration:</span>{" "}
                  {uploadedVideo.duration} seconds
                </li>
              </ul>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Upload Video Solution
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 dark:hover:bg-[#475569] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default UploadVideoSolution;
