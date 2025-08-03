import { Icon } from "../../components";

const FeatureCard = ({ iconPath, title, description, isOutlineIcon = false }) => (
  <div className="bg-white dark:bg-gray-800/70 p-6 rounded-xl shadow-lg dark:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-gray-700/50">
    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400 rounded-lg mb-4 border border-orange-200 dark:border-orange-500/30">
      <Icon 
        d={iconPath} 
        className="w-7 h-7" 
        isOutline={isOutlineIcon} 
        pathProps={isOutlineIcon ? {} : { fillRule: 'evenodd', clipRule: 'evenodd' }}
        svgProps={{}}
      />
    </div>
    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;