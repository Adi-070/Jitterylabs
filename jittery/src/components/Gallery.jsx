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
          "http://localhost:1337/api/galleries?populate=*",
        )
        const data = await response.json()
        const formattedImages = data.data.map((item) => ({
          src: `http://localhost:1337${item.pic.formats.thumbnail.url}`,
          alt: item.pic.alternativeText || `Image ${item.id}`,
          text: item.text, // Add text property for hover
          width: item.pic.width,
          height: item.pic.height,
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
            <div key={index} className="relative group p-2">
              <Card className="overflow-hidden bg-black-100">
                <CardContent className="p-0 relative">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt || "Gallery Image"}
                    className="w-full h-auto object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      aspectRatio: `${image.width} / ${image.height}`,
                    }}
                  />
                  {/* Text overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-lg font-medium">{image.text}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No images to display</p>
        )}
      </Masonry>
    </div>
  )
}
