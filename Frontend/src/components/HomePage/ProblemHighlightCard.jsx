import { NavLink } from "react-router";

const ProblemHighlightCard = ({ title, description, borderColor, textColor, bgColor, problemsCount }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-3xl border-t-4 ${borderColor}`}>
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-slate-500 dark:text-gray-500 uppercase font-medium">Problems Available</span>
        <span className={`text-sm font-bold ${textColor}`}>{problemsCount}+</span>
      </div>
      <NavLink to={"/problems"} className={`block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${bgColor} transition-opacity duration-150`}>
        View Problems
      </NavLink>
    </div>
  </div>
);

export default ProblemHighlightCard;