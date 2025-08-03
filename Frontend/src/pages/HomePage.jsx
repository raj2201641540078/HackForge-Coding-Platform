import React from 'react';
import { HeroSection, FeaturesSection, ProblemHighlights, CallToActionSection, FeaturedCoursesSection } from "../components";


export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProblemHighlights />
       <FeaturedCoursesSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;