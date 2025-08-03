import { Icon } from "../../components";

// Icon Paths (Heroicons)
const EYE_ICON_PATH = "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M12 15a3 3 0 100-6 3 3 0 000 6z";
const EYE_SLASH_ICON_PATH = "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243";

const InputField = ({ 
  id, 
  label, 
  type, 
  placeholder, 
  iconPath, 
  register, 
  error,
  isPasswordField = false,
  isPasswordVisible = false,
  onToggleVisibility = () => {}
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon d={iconPath} className="h-5 w-5 text-slate-400 dark:text-gray-500" />
      </div>
      <input
        type={isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type}
        id={id}
        className={`block w-full pl-10 pr-3 py-2.5 border rounded-md shadow-sm 
                    sm:text-sm transition-colors
                    bg-white dark:bg-gray-700 
                    text-slate-900 dark:text-white
                    placeholder-slate-400 dark:placeholder-gray-500 
                    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                           : 'border-slate-300 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500'}
                    focus:outline-none 
                    ${isPasswordField ? 'pr-10' : ''}`}
        placeholder={placeholder}
        {...register}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error-message` : undefined}
      />
      {isPasswordField && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          onClick={onToggleVisibility}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          <Icon d={isPasswordVisible ? EYE_SLASH_ICON_PATH : EYE_ICON_PATH} className="h-5 w-5" />
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400" id={`${id}-error-message`}>{error.message}</p>}
  </div>
);

export default InputField;