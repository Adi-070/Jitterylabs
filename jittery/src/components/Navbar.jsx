"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Menu } from "lucide-react"


function SidePanel({ isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Jittery Labs</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col text-white gap-4 mt-8">
          <SheetClose asChild>
            <Link href="/" className="text-lg hover:text-gray-600">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/project" className="text-lg hover:text-gray-600">
              Projects
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/service" className="text-lg hover:text-gray-600">
              Services
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about" className="text-lg hover:text-gray-600">
              Schedule a Meeting
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/blog" className="text-lg hover:text-gray-600">
              Blogs
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function FloatingMenu({ isVisible, onClick }) {
  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 text-white right-4 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Button variant="outline" size="icon" onClick={onClick}>
      <img src="JL-white-transparent.png" 
            style={{height: "50px"}}/>
      </Button>
    </div>
  )
}

export function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 85) {
        setIsNavbarVisible(false)
      } else if (currentScrollY < 85) {
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])
  return (
    <>
    <div className="relative w-full bg-black text-white border-b-2 border-white z-20">
      <div className="flex text-[30px] font-bold items-center justify-center mt-3 font-sans">
        Jittery Labs
      </div>
      {/* Top Navigation */}
      <nav className="flex h-11 items-center justify-center px-4 text-xs font-light">
        <div className="flex w-full max-w-[1024px] items-center justify-between">
          <Link href="/" className="text-white hover:opacity-80">
            <img src="JL-white-transparent.png" 
            style={{height: "75px"}}/>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 pr-[4.2rem] lg:flex">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/project" className="text-gray-300 hover:text-white">
              Projects
            </Link>
            <Link href="/service" className="text-gray-300 hover:text-white">
              Services
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white ">
              Schedule a Meeting
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white ">
              Blogs
            </Link>
          </div>
        </div>
      </nav>
    </div>
    <FloatingMenu isVisible={!isNavbarVisible} onClick={() => setIsOpen(true)} />
    <SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

