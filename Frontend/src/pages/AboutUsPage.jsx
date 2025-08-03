import {
  FileCode,    
  Brain,          
  ListChecks,    
  Trophy,         
  Lock,         
  Github,         
  Linkedin,       
  Target,         
  Users,          
} from 'lucide-react';
import { HackForgeLogo } from "../components"

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-[#f8fafc] dark:bg-[#1a2332] p-7 rounded-lg border border-[#e2e8f0] dark:border-[#334155] transform hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-[#f97316]/10 dark:bg-[#f97316]/20 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-[#1e293b] dark:text-[#e2e8f0]">{title}</h3>
    <p className="text-[#475569] dark:text-[#94a3b8]">{children}</p>
  </div>
);

const TechBadge = ({ href, children }) => {
  const badgeContent = (
    <span className="inline-block bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 transition-colors duration-200 group-hover:bg-[#f97316]/10 group-hover:border-[#f97316]/30 dark:group-hover:bg-[#f97316]/20 dark:group-hover:border-[#f97316]/40">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group transform transition-transform duration-200 hover:scale-105"
      >
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
};

const AboutUsPage = () => {
  const features = [
    {
      icon: <FileCode size={24} className="text-[#f97316]" />,
      title: 'Solve DSA Problems',
      description: 'Practice on problems categorized by topic and difficulty to sharpen your skills methodically.',
    },
    {
      icon: <ListChecks size={24} className="text-[#f97316]" />,
      title: 'Custom Sprints',
      description: 'Organize bookmarked problems into custom collections for focused practice sessions.',
    },
    {
      icon: <Brain size={24} className="text-[#f97316]" />,
      title: 'AI-Powered Tutor',
      description: 'Get intelligent hints and guidance without revealing the final answer.',
    },
    {
      icon: <Trophy size={24} className="text-[#f97316]" />,
      title: 'Compete & Rank',
      description: 'Challenge yourself on the leaderboard and see how you stack up against your peers.',
    },
    {
      icon: <Lock size={24} className="text-[#f97316]" />,
      title: 'Secure & Modern',
      description: 'Enjoy a secure platform with JWT & OAuth, Monaco editor, and light/dark modes.',
    },
    {
      icon: <Users size={24} className="text-[#f97316]" />,
      title: 'Community Focused',
      description: 'Share problems, discuss solutions, and learn together with other developers.',
    },
  ];

  const technologies = {
    frontend: [
      { name: 'React', href: 'https://react.dev/' },
      { name: 'Vite', href: 'https://vitejs.dev/' },
      { name: 'TailwindCSS', href: 'https://tailwindcss.com/' },
      { name: 'Monaco Editor', href: 'https://microsoft.github.io/monaco-editor/' },
      { name: 'Redux Toolkit', href: 'https://redux-toolkit.js.org/' },
    ],
    backend: [
      { name: 'Node.js', href: 'https://nodejs.org/' },
      { name: 'Express', href: 'https://expressjs.com/' },
      { name: 'MongoDB', href: 'https://www.mongodb.com/' },
      { name: 'Redis', href: 'https://redis.io/' },
      { name: 'JWT', href: 'https://jwt.io/' },
    ],
    integrations: [
      { name: 'Judge0 API', href: 'https://judge0.com/' },
      { name: 'Google GenAI SDK', href: 'https://ai.google.dev/sdks' },
      { name: 'OAuth (Google/GitHub)', href: 'https://oauth.net/' },
      { name: 'Cloudinary', href: 'https://cloudinary.com/' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="text-center mb-16 relative">
        <HackForgeLogo className="absolute inset-0 w-full h-full text-slate-200/30 dark:text-slate-800/40 -z-10 transform scale-150" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
          About HackForge
        </h1>
        <p className="mt-4 text-xl text-[#475569] dark:text-[#94a3b8] max-w-3xl mx-auto">
          An advanced coding platform designed to help developers learn, practice, and master problem-solving skills
          in a structured environment.
        </p>
      </header>

      <section className="mb-20">
        <div className="flex justify-center items-center">
          <div className="bg-[#ffffff] dark:bg-[#232b3b] p-8 rounded-xl border border-[#e2e8f0] dark:border-[#334155]">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Target size={30} className="mr-3 text-[#f97316]" />
              Our Mission
            </h2>
            <p className="text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              Many learners struggle with unstructured problem sets, a lack of progress tracking, and the temptation
              of solution spoilers. HackForge was built to solve these challenges by providing a one-stop platform
              that combines practice, guided learning, and community features in a seamless, secure experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
              {feature.description}
            </FeatureCard>
          ))}
        </div>
      </section>

      <section className="mb-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Technology</h2>
        <p className="text-lg text-[#475569] dark:text-[#94a3b8] mb-8 max-w-2xl mx-auto">
          We use a modern, robust stack to deliver a fast, secure, and reliable experience.
        </p>
        <div className="space-y-6">
          {Object.entries(technologies).map(([section, techs]) => (
            <div key={section}>
              <h3 className="text-xl font-semibold mb-3 capitalize">{section}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {techs.map((tech) => (
                  <TechBadge key={tech.name} href={tech.href}>
                    {tech.name}
                  </TechBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#ffffff] dark:bg-[#232b3b] rounded-xl p-8 md:p-12 border border-[#e2e8f0] dark:border-[#334155] mb-10">
        <h2 className="text-4xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="max-w-md mx-auto bg-[#f8fafc] dark:bg-[#1a2332] rounded-lg p-6 text-center shadow-lg">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQFe8N0-AYKDjQ/profile-displayphoto-shrink_400_400/B4DZZrv2sWH4Ag-/0/1745564429806?e=1756944000&v=beta&t=kkKMvth4HnqxL6HOcfvhZ7pEJTQY0tzIcXmuWCyGVvk"
            alt="Prem Siddhartha"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#f97316]"
          />
          <h3 className="text-2xl font-bold text-[#1e293b] dark:text-[#e2e8f0]">Prem Siddhartha</h3>
          <p className="text-[#f97316] font-semibold mb-3">Full Stack Developer</p>
          <p className="text-[#475569] dark:text-[#94a3b8] mb-4">
            The mind and muscle behind HackForge, Prem is a passionate developer dedicated to creating tools that
            empower other coders. He built HackForge to solve the common hurdles faced by learners in the tech space.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/Siddharth9304" target="_blank" aria-label="Github Profile" className="text-slate-500 hover:text-[#f97316]">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/premsiddhartha" target="_blank" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-[#f97316]">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;