import React from 'react';


const LectureVideoPlayer = ({ videoUrl, title }) => {

  return (
    <div className="aspect-video bg-slate-200 dark:bg-slate-950 rounded-lg overflow-hidden shadow-2xl relative">
        <iframe
          src={`${videoUrl}?autoplay=0&rel=0`} // Added autoplay=0 and rel=0 for better UX
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0"
        ></iframe>
    </div>
  );
};

export default LectureVideoPlayer;