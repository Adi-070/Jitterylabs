import AboutUs from '@/components/AboutUs'
import React from 'react'
import { Navbar } from '@/components/Navbar'

const about = () => {
  return (
    <div className="min-h-screen bg-black">
    <Navbar /><br/>
    <main className="container text-white mx-auto px-4 py-12">
      <AboutUs/>
    </main>
  </div>
  )
}

export default about