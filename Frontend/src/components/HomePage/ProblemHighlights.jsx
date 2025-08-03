import ProblemHighlightCard from "./ProblemHighlightCard";

const ProblemHighlights = () => (
  <section id="problems" className="py-16 sm:py-24 bg-slate-100 dark:bg-gray-800/50 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Start Your Journey</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-gray-400">
          Dive into problems based on difficulty or explore curated topic collections.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProblemHighlightCard 
          title="Easy Peasy" 
          description="Perfect for beginners to get started and build foundational knowledge."
          borderColor="border-t-green-500"
          textColor="text-green-500"
          bgColor="bg-green-500"
          problemsCount={9}
        />
        <ProblemHighlightCard 
          title="Medium Gains" 
          description="Challenge yourself with moderately difficult problems to strengthen your skills."
          borderColor="border-t-yellow-500"
          textColor="text-yellow-500"
          bgColor="bg-yellow-500"
          problemsCount={7}
        />
        <ProblemHighlightCard 
          title="Hardcore Mode" 
          description="Tackle complex problems designed to push your limits and deepen your expertise."
          borderColor="border-t-red-500"
          textColor="text-red-500"
          bgColor="bg-red-500"
          problemsCount={6}
        />
      </div>
    </div>
  </section>
);

export default ProblemHighlights;