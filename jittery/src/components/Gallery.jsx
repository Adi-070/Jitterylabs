"use client"
import { useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://backend-jittery.onrender.com/api/galleries?populate=*",
        )
        const data = await response.json()
        
        const formattedProjects = data.data.map((item) => ({
          id: item.id,
          homepagePicture: {
            src: item.homepage_picture.url,
            alt: item.homepage_picture.alternativeText || `Image ${item.id}`,
            width: item.homepage_picture.width,
            height: item.homepage_picture.height,
          },
          hoveringText: item.hovering_text,
          projectName: item.Project_name,
          modalPictures: item.modal_pictures.map(pic => ({
            id: pic.id,
            src: pic.url,
            alt: pic.alternativeText || `Modal Image ${pic.id}`,
            width: pic.width,
            height: pic.height,
          }))
        }))
        setProjects(formattedProjects)
      } catch (error) {
        console.error("Error fetching gallery images:", error)
      }
    }
    fetchGallery()
  }, [])

  const openSidebar = (project) => {
    setSelectedProject(project)
    setActiveImageIndex(0)
    setSidebarOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    document.body.style.overflow = 'auto'
  }

  const navigateImage = (direction) => {
    if (!selectedProject) return
    
    const totalImages = selectedProject.modalPictures.length
    if (direction === 'next') {
      setActiveImageIndex((prev) => (prev + 1) % totalImages)
    } else {
      setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <div className="container px-4 py-12 relative">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-6"
        columnClassName="pl-6 space-y-6"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="w-full mb-6">
              <div 
                className="relative w-full overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => openSidebar(project)}
              >
                <img
                  src={project.homepagePicture.src || "/placeholder.svg"}
                  alt={project.homepagePicture.alt || "Gallery Image"}
                  className="w-full h-auto object-cover transition-all duration-300 group-hover:opacity-90"
                  style={{
                    aspectRatio: `${project.homepagePicture.width} / ${project.homepagePicture.height}`,
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg font-medium px-4 text-center text-white">{project.hoveringText}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No images to display</p>
        )}
      </Masonry>

      {/* Dark Themed Side Panel Modal with Fixed Layout */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-black shadow-xl transform transition-transform duration-300 z-50 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedProject && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">{selectedProject.projectName}</h2>
              <button 
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Fixed height layout */}
            <div className="flex flex-col h-full">
              {/* Main image viewer - using flex-1 to take available space */}
              <div className="flex-1 flex items-center justify-center  relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {selectedProject.modalPictures.length > 0 && (
                    <img
                      src={selectedProject.modalPictures[activeImageIndex].src || "/placeholder.svg"}
                      alt={selectedProject.modalPictures[activeImageIndex].alt || "Modal Image"}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
                
                {/* Navigation buttons */}
                {selectedProject.modalPictures.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-10"
                      onClick={() => navigateImage('prev')}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      className="absolute right-4 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-10"
                      onClick={() => navigateImage('next')}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Fixed height thumbnail strip - always visible */}
              <div className="h-24 border-t border-gray-800 flex flex-col">
                <div className="flex overflow-x-auto space-x-2 p-2 h-20">
                  {selectedProject.modalPictures.map((image, index) => (
                    <div 
                      key={image.id} 
                      className={`flex-shrink-0 cursor-pointer h-full ${
                        index === activeImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-gray-400 text-center text-sm h-4">
                  {activeImageIndex + 1} / {selectedProject.modalPictures.length}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Backdrop overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}