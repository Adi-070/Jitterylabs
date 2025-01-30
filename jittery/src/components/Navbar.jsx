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
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <SheetClose asChild>
            <Link href="/home" className="text-lg hover:text-gray-600">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/service" className="text-lg hover:text-gray-600">
              Service
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about" className="text-lg hover:text-gray-600">
              About us
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
      className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Button variant="outline" size="icon" onClick={onClick}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
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

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false)
      } else if (currentScrollY < 50) {
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])
  return (
    <>
    <div className="w-full bg-black text-white border-b-2 border-white">
      {/* Top Navigation */}
      <nav className="flex h-11 items-center justify-center px-4 text-xs font-light">
        <div className="flex w-full max-w-[1024px] items-center justify-between gap-8">
          <Link href="/" className="text-white hover:opacity-80">
            <Apple className="h-5 w-5" />
            <span className="sr-only">Apple</span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            <Link href="/home" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Home
            </Link>
            <Link href="/service" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Service
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              About us
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white-800 hover:opacity-80">
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

