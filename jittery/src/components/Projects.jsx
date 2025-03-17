import { useState, useEffect } from "react";

export default function Projects() {

  const mockProjects = [
    { title: "Rewrite the Stars", videoId: "pRfmrE0ToTo" },
    { title: "Timber", videoId: "hHUbLv4ThOo" },
    { title: "One Call Away", videoId: "BxuY9FET9Y4" },
  ];

  
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const extractVideoId = (url) => {
    if (!url) return "";
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? match[2]
      : "";
  };


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/projects?populate=*");
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        
        // Transform API data to match the format we need
        if (data && data.data && data.data.length > 0) {
          const formattedProjects = data.data.map(item => ({
            title: item.title,
            videoId: extractVideoId(item.link),
            documentId: item.documentId
          }));
          
          setProjects([...formattedProjects, ...mockProjects]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
    
      } finally {
        setLoading(false);
      }
    };
    
    const timer = setTimeout(() => {
      fetchProjects();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
      
      <div className="w-full max-w-4xl space-y-8">
        {projects.map((project, index) => (
          <div key={project.documentId || `mock-${index}`} className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">{project.title}</h2>
            <div className="w-full h-[400px] lg:h-[500px] overflow-hidden transition-transform duration-300 ease-in-out transform group hover:scale-105">
              <VideoFrame videoId={project.videoId} />
            </div>
          </div>
        ))}
      </div>
      
      {loading && <p className="text-lg mt-4">Loading more projects...</p>}
      {error && <p className="text-red-500 mt-4">Error loading additional projects: {error}</p>}
    </div>
  );
}

function VideoFrame({ videoId }) {
  const [autoplay, setAutoplay] = useState(false);
  
 
  const validVideoId = videoId || "";
  const src = `https://www.youtube.com/embed/${validVideoId}?autoplay=${autoplay ? 1 : 0}&mute=1`;
  
  return (
    <iframe
      className="w-full h-full rounded-lg"
      src={src}
      frameBorder="0"
      allowFullScreen
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    ></iframe>
  );
}