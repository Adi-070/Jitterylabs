import { useState } from "react";

export default function Projects() {
  const projects = [
    { title: "Rewrite the Stars", videoId: "pRfmrE0ToTo" },
    { title: "Timber", videoId: "hHUbLv4ThOo" },
    { title: "One Call Away", videoId: "BxuY9FET9Y4" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
      <div className="w-full max-w-4xl space-y-8"> {/* Increased max width */}
        {projects.map((project, index) => {
          const [src, setSrc] = useState(`https://www.youtube.com/embed/${project.videoId}?autoplay=0&mute=1`);

          return (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-center">{project.title}</h2> {/* Increased text size */}
              <div className="w-full h-[400px] lg:h-[500px]"> {/* Set explicit height */}
                <iframe
                  className="w-full h-full rounded-lg"
                  src={src}
                  frameBorder="0"
                  allowFullScreen
                  onMouseEnter={() => setSrc(`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1`)}
                  onMouseLeave={() => setSrc(`https://www.youtube.com/embed/${project.videoId}?autoplay=0&mute=1`)}
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
