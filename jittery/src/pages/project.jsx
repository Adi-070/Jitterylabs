import Projects from '@/components/Projects'
import React from 'react'
import { Navbar } from '@/components/Navbar'

const project = () => {
  return (
    <div className="min-h-screen bg-black">
    <Navbar /><br/>
    <main className="container text-white mx-auto px-4 py-12">
      <Projects/>
    </main>
  </div>
  )
}

export default project