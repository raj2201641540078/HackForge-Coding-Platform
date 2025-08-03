import FeatureCard from "./FeatureCard";

// Icon Paths (Heroicons)
const CODE_BRACKET_ICON_PATH = "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5";
const CHART_BAR_ICON_PATH = "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z";
const TAG_ICON_PATH = "M12.586 2.586A2 2 0 0011.172 2H4.5A2.5 2.5 0 002 4.5v6.672a2 2 0 00.586 1.414l7.414 7.414a2 2 0 002.828 0l6.672-6.672a2 2 0 000-2.828l-7.414-7.414zM9 8.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z";
const TROPHY_ICON_PATH = "M16.5 18.75h-9m9 0a3.375 3.375 0 0 1-3.375-3.375h-2.25a3.375 3.375 0 0 1-3.375 3.375m9 0V15M6.75 15V18.75m0-9A2.25 2.25 0 0 1 9 6.75h6A2.25 2.25 0 0 1 17.25 9v3H6.75V9Z M15 6.75V3.75A2.25 2.25 0 0 0 12.75 1.5h-1.5A2.25 2.25 0 0 0 9 3.75v3";

const FeaturesSection = () => (
  <section id="features" className="py-16 sm:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Everything You Need to Excel</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-gray-400">
          HackForge provides a comprehensive suite of tools and resources to help you on your coding journey.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard 
          iconPath={CODE_BRACKET_ICON_PATH} 
          title="Vast Problem Library" 
          description="Access a wide array of coding challenges, from beginner-friendly to highly complex."
          isOutlineIcon={true}
        />
        <FeatureCard 
          iconPath={CHART_BAR_ICON_PATH} 
          title="Difficulty Levels" 
          description="Filter problems by difficulty (Easy, Medium, Hard) to match your current skill level."
        />
        <FeatureCard 
          iconPath={TAG_ICON_PATH} 
          title="Topic-wise Challenges" 
          description="Focus on specific areas like Data Structures, Algorithms, Dynamic Programming, and more."
        />
        <FeatureCard 
          iconPath={TROPHY_ICON_PATH} 
          title="Real-time Contests" 
          description="Participate in exciting coding contests, test your speed and accuracy against others."
          isOutlineIcon={true}
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;