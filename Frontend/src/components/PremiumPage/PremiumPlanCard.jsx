import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
  
const PremiumPlanCard = ({ plan }) => {
    const navigate = useNavigate();

    return (
        <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-300 border 
            bg-white dark:bg-[#232b3b] border-gray-200 dark:border-[#334155] hover:border-gray-400 dark:hover:border-gray-600`}
        onClick={() => navigate(`${plan.id}/checkout`)}
        >
        {plan.bestValue && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
            Best Value
            </div>
        )}
        <div className="flex-grow">
            <div className="flex justify-between items-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#1e293b] dark:text-[#e2e8f0]">
                {plan.name}
            </h3>
            <span className="inline-block bg-[#e2e8f0] dark:bg-[#334155] text-[#1e293b] dark:text-[#e2e8f0] text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                {plan.tag}
            </span>
            </div>
            <div className="flex flex-wrap items-baseline my-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
                {plan.price}
            </span>
            <span className="ml-1 text-xs sm:text-sm text-[#475569] dark:text-[#94a3b8]">
                / {plan.cycle}
            </span>
            {plan.originalPrice && (
                <span className="ml-2 text-[10px] sm:text-xs text-red-500 line-through">
                {plan.originalPrice}
                </span>
            )}
            </div>
            <ul className="space-y-1.5 mt-2">
            {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                <Check size={16} className="text-green-500 flex-shrink-0" />
                <span className="text-sm text-[#475569] dark:text-[#94a3b8]">
                    {feature}
                </span>
                </li>
            ))}
            </ul>
        </div>
        <button
            className={`mt-5 py-2 rounded-lg text-sm font-semibold transition-all bg-[#f97316] text-white hover:bg-orange-600`}
        >
            {plan.cta}
        </button>
        </motion.div>
    );
};

export default PremiumPlanCard;
