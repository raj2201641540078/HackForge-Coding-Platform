import React from 'react';
import { StarIcon } from '../Icons/CoursesPageIcons';


const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center mb-4">
        <img src={testimonial.user.avatarUrl || `https://picsum.photos/seed/${testimonial.user.id}/80/80`} alt={testimonial.user.name} className="w-12 h-12 rounded-full mr-4 border-2 border-slate-300 dark:border-slate-600" />
        <div>
          <h4 className="text-md font-semibold text-slate-800 dark:text-white">{testimonial.user.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.date}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
        ))}
      </div>
      <p className="text-base italic text-slate-600 dark:text-slate-300 leading-relaxed">"{testimonial.text}"</p>
    </div>
  );
};

export default TestimonialCard;