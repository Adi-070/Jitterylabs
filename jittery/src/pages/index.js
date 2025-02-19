import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import CallToAction from "@/components/CallToAction";
import Gallery from "@/components/Gallery";
import Loader from "@/components/Loader";


export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Loader/>
      <Navbar className="z-9999"/><br/>
      <main className="container text-white mx-auto px-4 py-12">
        <CallToAction/>
        <Gallery/>
      </main>
    </div>
  );
}
