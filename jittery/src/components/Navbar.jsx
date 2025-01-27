"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"

export function Navbar() {
  return (
    <div className="w-full bg-black text-white">
      {/* Top Navigation */}
      <nav className="flex h-11 items-center justify-center px-4 text-xs font-light">
        <div className="flex w-full max-w-[1024px] items-center justify-between gap-8">
          <Link href="/" className="text-white hover:opacity-80">
            <Apple className="h-5 w-5" />
            <span className="sr-only">Apple</span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            <Link href="/store" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Store
            </Link>
            <Link href="/mac" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Mac
            </Link>
            <Link href="/ipad" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              iPad
            </Link>
            <Link href="/iphone" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              iPhone
            </Link>
            <Link href="/watch" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Watch
            </Link>
            <Link href="/vision" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Vision
            </Link>
            <Link href="/airpods" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              AirPods
            </Link>
            <Link href="/tv-home" className="text-gray-300 hover:text-white-800hover:opacity-80">
              TV
            </Link>
            <Link href="/entertainment" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Entertainment
            </Link>
            <Link href="/accessories" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Accessories
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white-800 hover:opacity-80">
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <nav className="flex h-12 items-center justify-center border-b border-zinc-700 px-4">
        <div className="flex w-full max-w-[1024px] items-center justify-between">
          <h1 className="text-xl font-semibold">AirPods Pro (2nd generation)</h1>

          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/airpods-pro/overview" className="text-xs text-gray-300 hover:text-white-800 hover:opacity-80">
              Overview
            </Link>
            <Link href="/airpods-pro/tech-specs" className="text-xs text-gray-300 hover:text-white-800 hover:opacity-80">
              Tech Specs
            </Link>
            <Link href="/airpods-pro/compare" className="text-xs text-gray-300 hover:text-white-800 hover:opacity-80">
              Compare
            </Link>
            <Button variant="default" className="rounded-full bg-blue-600 px-6 text-xs hover:bg-blue-700">
              Buy
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

