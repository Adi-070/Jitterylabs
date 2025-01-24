"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ListItem } from "./ListItem"

const HamburgerIcon = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 ease-in-out"
  >
    <path
      d={isOpen ? "M6 18L18 6M6 6L18 18" : "M4 6H20M4 12H20M4 18H20"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-300 ease-in-out"
    />
  </svg>
)

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Blog" },
  ]

  const Sidebar = () => (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-white hover:bg-white/20 transition-colors duration-200",
            isScrolled ? "md:flex" : "md:hidden",
          )}
        >
          <HamburgerIcon isOpen={isSidebarOpen} />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-br from-purple-700 to-indigo-900">
        <nav className="flex flex-col gap-10 mt-10">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="text-xl text-white font-bold">
          Logo
        </Link>

        <div
          className={cn(
            "hidden md:flex items-center transition-opacity duration-300",
            isScrolled ? "opacity-0" : "opacity-100",
          )}
        >
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/20 data-[state=open]:bg-white/20",
                        item.href === "/blog" ? "hidden" : "text-white",
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">Blog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px]">
                    <ListItem href="/blog/tech" title="Tech Blog">
                      Latest updates in technology
                    </ListItem>
                    <ListItem href="/blog/design" title="Design Blog">
                      Insights about UI/UX design
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sidebar />
      </div>
    </header>
  )
}

export default Navbar

