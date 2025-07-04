"use client";
import SidebarMenu from "./Sidebarmenu";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Page() {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for ", query);
  };

  const bannerImages = [
    "/forBanner1.jpg",
    "/forBanner2.jpg",
    "/forBanner3.jpg",
    "/forBanner4.jpg"

  ];

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentIndex((prev)=>(prev+1) % bannerImages.length);
    },5000);
    return () => clearInterval(interval);
  },[]);

  


  return (
    <div className="flex min-h-screen relative bg-zinc-900 text-white">
      <SidebarMenu />

      {/* Main Content */}
      <div className="mainContent ml-16 w-full">
        <Navbar />

        {/* Hero / Banner Section */}
       <div className="relative h-[500px] w-full rounded-b-2xl mt-[20px] overflow-hidden bg-zinc-900">
  {/* Background Image */}
  <Image
    src={bannerImages[currentIndex]}
    alt={`Slide ${currentIndex + 1}`}
    layout="fill"
    objectFit="cover"
    className="z-0"
  />

  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm z-10" />

  {/* Content on top of image */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-md">Discover, Collect & Sell Rare NFTs</h1>
    <p className="text-zinc-300 mb-6 text-lg max-w-2xl drop-shadow-sm">
      A decentralized marketplace for digital collectibles and creative assets.
    </p>
    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-black font-semibold transition">
      Explore Marketplace
    </button>
  </div>
  </div>


        {/* Featured Collections */}
        <div className="w-full py-16 px-6 bg-zinc-900">
          <h1 className="text-3xl font-bold mb-2">Featured Collections</h1>
          <h3 className="text-zinc-400 mb-10">Spotlight on the Rare & Remarkable</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/nftPage">
              <div className="rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-zinc-400/20">
                <Image
                  className="w-full h-48 object-cover"
                  src="/possessed-photography-lxoq0zppH5w-unsplash.jpg"
                  width={300}
                  height={300}
                  alt="First collection."
                />
              </div>
            </Link>
            <div className="bg-zinc-800 rounded-2xl h-48 flex items-center justify-center text-zinc-400">
              Coming Soon
            </div>
            <div className="bg-zinc-800 rounded-2xl h-48 flex items-center justify-center text-zinc-400">
              Coming Soon
            </div>
            <div className="bg-zinc-800 rounded-2xl h-48 flex items-center justify-center text-zinc-400">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Hot Today Section */}
        <div className="w-full py-16 px-6 bg-zinc-900">
          <h1 className="text-3xl font-bold mb-2">Hot Today!</h1>
          <h3 className="text-zinc-400 mb-10">This week's curated and handpicked drops.</h3>

          {/* Placeholder NFT Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-zinc-400/20 transition-transform transform hover:scale-105"
              >
                <div className="h-48 bg-zinc-700 flex items-center justify-center">
                  <span className="text-zinc-500">NFT #{item}</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold">NFT Name</h4>
                  <p className="text-zinc-400 text-sm">0.05 ETH</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
