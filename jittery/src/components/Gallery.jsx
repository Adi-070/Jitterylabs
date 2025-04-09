"use client"
import { useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import { Card, CardContent } from "@/components/ui/card"

export default function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://backend-jittery.onrender.com/api/galleries?populate=*",
        )
        const data = await response.json()
        
        const formattedImages = data.data.map((item) => ({
          src: item.homepage_picture.formats.medium.url,
          alt: item.homepage_picture.alternativeText || `Image ${item.id}`,
          text: item.hovering_text,
          width: item.homepage_picture.formats.medium.width,
          height: item.homepage_picture.formats.medium.height,
        }))
        setImages(formattedImages)
      } catch (error) {
        console.error("Error fetching gallery images:", error)
      }
    }
    fetchGallery()
  }, [])

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <div className="container px-4 py-12">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-6"
        columnClassName="pl-6 space-y-6"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="w-full mb-6">
              <div className="relative w-full overflow-hidden rounded-lg group">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || "Gallery Image"}
                  className="w-full h-auto object-cover transition-all duration-300 group-hover:opacity-90"
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <p className="text-lg font-medium px-4 text-center text-white">{image.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No images to display</p>
        )}
      </Masonry>
    </div>
  )
}