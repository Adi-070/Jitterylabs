import { Card, CardContent } from "@/components/ui/card"

const images = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEzwaoQ5esQEZKr5BOSk6zkMfIBV6PwGnYA&s",
    alt: "Skyscrapers in black and white with steam",
    className: "md:col-start-1",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFtD1c0JZ1isExy5Y8I4cPPOY09gjl0O4mg&s",
    alt: "Evening street scene",
    className: "md:col-start-2 md:mt-16",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wEMLjPi2r1xHWVPWxX7wzsKiBZRW6B3RyQ&s",
    alt: "Modern building at night",
    className: "md:col-start-1 md:-mt-16",
  },
]

export default function Gallery() {
  return (
    <div className="container px-4 py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto bg-black-100">
        {images.map((image, index) => (
          <Card key={index} className={`${image.className} transition-transform duration-300 hover:scale-105 bg-black-100`}>
            <CardContent className="p-2">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-[300px] md:h-[350px] object-cover rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

