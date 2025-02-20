export default function Projects() {
    const projects = [
      { title: "Rewrite the Stars", videoId: "pRfmrE0ToTo" },
      { title: "Timber", videoId: "hHUbLv4ThOo" },
      { title: "One Call Away", videoId: "BxuY9FET9Y4" },
    ];
  
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
        <div className="w-full max-w-2xl space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-center">{project.title}</h2>
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${project.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  }
  