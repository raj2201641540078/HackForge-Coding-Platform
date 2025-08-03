import { useForm } from 'react-hook-form';
import {
  MailIcon,
  UserIcon,
  SendIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
} from 'lucide-react';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1500));
    console.log('Form Submitted:', data);
    reset(); // clear fields after submit
  };

  const InputField = ({ id, name, type, placeholder, icon, registerField, error }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#475569] dark:text-[#94a3b8] mb-1">
        {placeholder}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 bg-[#f8fafc] dark:bg-[#1a2332] py-3 pl-10 pr-3 text-[#1e293b] dark:text-[#e2e8f0] ring-1 ring-inset ${
            error ? 'ring-red-500' : 'ring-[#e2e8f0] dark:ring-[#334155]'
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
            error ? 'focus:ring-red-500' : 'focus:ring-[#f97316]'
          }`}
          {...registerField}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-[#475569] dark:text-[#94a3b8] max-w-2xl mx-auto">
          Have a question, a bug report, or a feature request? Drop us a line below or email us directly.
        </p>
        <p className="mt-2 text-[#475569] dark:text-[#94a3b8]">
          Email:{' '}
          <a href="mailto:contact@hackforge.dev" className="font-semibold text-[#f97316] hover:underline">
            contact@hackforge.dev
          </a>
        </p>
      </header>

      <div className="bg-[#ffffff] dark:bg-[#232b3b] rounded-xl p-8 border border-[#e2e8f0] dark:border-[#334155] shadow-lg">
        {isSubmitSuccessful ? (
          <div className="text-center p-8">
            <CheckCircleIcon size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold">Message Sent!</h2>
            <p className="text-[#475569] dark:text-[#94a3b8] mt-2">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                registerField={register('name', { required: 'Name is required' })}
                error={errors.name}
              />
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                registerField={register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                error={errors.email}
              />
            </div>

            <InputField
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              icon={<MessageSquareIcon className="h-5 w-5 text-gray-400" />}
              registerField={register('subject', { required: 'Subject is required' })}
              error={errors.subject}
            />

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#475569] dark:text-[#94a3b8] mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell us what's on your mind..."
                className={`block w-full rounded-md border-0 bg-[#f8fafc] dark:bg-[#1a2332] py-3 px-4 text-[#1e293b] dark:text-[#e2e8f0] ring-1 ring-inset ${
                  errors.message ? 'ring-red-500' : 'ring-[#e2e8f0] dark:ring-[#334155]'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.message ? 'focus:ring-red-500' : 'focus:ring-[#f97316]'
                }`}
                {...register('message', { required: 'Message is required' })}
              />
              {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-md">
                <AlertTriangleIcon size={20} />
                <p>Please fix the errors above before sending.</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#f97316] hover:opacity-90 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SendIcon size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
