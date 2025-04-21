import AboutUs from '@/components/AboutUs'
import React from 'react'
import { Navbar } from '@/components/Navbar'
import Blogs from '@/components/blogs'

const about = () => {
  return (
    <div className="min-h-screen bg-black">
    <Navbar /><br/>
    <main className="container text-white mx-auto px-4 py-12">
      <Blogs/>
    </main>
  </div>
  )
}

export default about