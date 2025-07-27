"use client";
import SidebarMenu from "./SidebarMenu";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Page() {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    "/forBanner1.jpg",
    "/forBanner2.jpg",
    "/forBanner3.jpg",
    "/forBanner4.jpg",
  ];
  const hotItems = [
  { id:1, src: "/game.jpg", name: "Pixel Wars 15164", price: "0.05 ETH" },
  { id:2, src: "/alien.jpg", name: "Strange Guy 6748", price: "0.12 ETH" },
  { id:3, src: "/dog.jpg", name: "Crypdog 3456", price: "0.03 ETH" },
  { id:4, src: "/record.jpg", name: "Record 1537", price: "0.08 ETH" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col relative bg-zinc-900 text-white">
      <div className="flex flex-1">
        <SidebarMenu />

        {/* Main Content */}
        <div className="mainContent ml-16 w-full">
          <Navbar />

          {/* Hero / Banner Section */}
          <div className="relative h-[500px] w-full rounded-b-2xl mt-[20px] overflow-hidden bg-zinc-900">
            <Image
              src={bannerImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              style={{objectFit:"cover"}}
              className="z-0"
            />
            <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm z-10" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <div className="p-4 backdrop-blur-md bg-zinc-100/30 rounded-2xl items-center flex flex-col transition-transform transform hover:scale-101">
              <h1 className="text-5xl font-bold text-zinc-900 mb-4 drop-shadow-md">
                Discover, Collect & Sell Rare NFTs
              </h1>
              <p className="text-zinc-900 mb-6 text-lg max-w-2xl drop-shadow-sm">
                A decentralized marketplace for digital collectibles and creative assets.
              </p>
              
              <Link href='/nftPage'>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-black font-semibold transition">
                Explore Marketplace
              </button>
              </Link>
              </div>
            </div>
          </div>

          {/* 🔥 Trending Collections Section */}
          <div className="w-full py-14 px-6 bg-zinc-900">
            <h2 className="text-3xl font-bold mb-2">Trending Collections</h2>
            <p className="text-zinc-400 mb-6">Highest sales in the past hour</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[
                {
                  title: "DX Terminal",
                  price: "< 0.01 ETH",
                  change: "+28%",
                  logo: "https://raw2.seadn.io/flow/a6bbe0836a104e39807169dff6cfd251/bb4751df6f7f9a083e682b1aa17ef3/e5bb4751df6f7f9a083e682b1aa17ef3.svg",
                },
                {
                  title: "Larvva Lads",
                  price: "< 0.01 ETH",
                  change: "+23%",
                  logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZ298ZW58MHx8MHx8fDA%3D",
                },
                {
                  title: "Lamborghini & Wilder",
                  price: "–",
                  change: "",
                  logo: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Courtyard.io",
                  price: "< 0.01 WETH",
                  change: "-12.1%",
                  logo: "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8fDA%3D",
                },
                {
                  title: "NBA Top Shot",
                  price: "0.93 FLOW",
                  change: "-1.8%",
                  logo: "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZ298ZW58MHx8MHx8fDA%3D",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition"
                >
                  <Image
                    src={item.logo}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-zinc-300">{item.price}</p>
                    <p
                      className={`text-sm ${
                        item.change.startsWith("+")
                          ? "text-green-400"
                          : item.change.startsWith("-")
                          ? "text-red-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🌟 Featured Collections */}
          <div className="w-full py-16 px-6 bg-zinc-900">
            <h1 className="text-3xl font-bold mb-2">Featured Collections</h1>
            <h3 className="text-zinc-400 mb-10">Spotlight on the Rare & Remarkable</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/listings">
                <div className="rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-zinc-400/20">
                  <Image
                    className="w-full h-48 object-cover"
                    src="/featured1.jpg"
                    width={300}
                    height={300}
                    alt="First collection."
                  />
                </div>
              </Link>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-2xl h-48 flex items-center justify-center text-zinc-400"
                >
                  Coming Soon
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 Hot Today Section */}
          <div className="w-full py-16 px-6 bg-zinc-900">
            <h1 className="text-3xl font-bold mb-2">Hot Today!</h1>
            <h3 className="text-zinc-400 mb-10">This week's curated and handpicked drops.</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {hotItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-zinc-400/20 transition-transform transform hover:scale-105"
                >
                  <div className="relative h-68 bg-zinc-700 flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt="NFT preview"
                      fill
                      style={{ objectFit: "cover" }}
                   />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-zinc-400 text-sm">{item.price}</p>
                  </div>
                </div>
              ))} 
            </div>
          </div>
          {/* 🎨 How NFTs Work & Why They Matter Section */}
<div className="w-full py-20 px-6 bg-zinc-900 text-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-6">How NFTs Work & Why They Matter</h2>
    <p className="text-center text-zinc-400 max-w-3xl mx-auto mb-12">
      NFTs (Non-Fungible Tokens) represent ownership of unique digital assets on the blockchain. Here's how the journey from creation to trading unfolds:
    </p>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        {
          title: "1. Create",
          description: "Upload your digital art, music, or asset. Set rarity, description, and pricing details.",
          icon: "🖌️",
        },
        {
          title: "2. Mint",
          description: "Your content is minted as a token on the blockchain, proving its authenticity and uniqueness.",
          icon: "🧬",
        },
        {
          title: "3. List",
          description: "List your NFT on our marketplace with a fixed or auction-based price.",
          icon: "📤",
        },
        {
          title: "4. Trade",
          description: "Buyers discover, bid, and trade NFTs transparently with crypto. Royalties go to creators!",
          icon: "🔄",
        },
      ].map((step, index) => (
        <div
          key={index}
          className="bg-zinc-800 rounded-2xl p-6 text-center shadow-md hover:shadow-zinc-600/30 transition duration-300"
        >
          <div className="text-4xl mb-4 animate-bounce">{step.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-zinc-400 text-sm">{step.description}</p>
        </div>
      ))}
    </div>

    {/* CTA at Bottom */}
    
  </div>
</div>
          {/* 👀 Eye-Catching CTA Animation to Mint Page */}
          <div className="w-full py-20 px-6 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent animate-pulse" />
  
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 animate-bounce">
              Ready to Mint Your Own NFT?
              </h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Turn your creativity into a digital asset on the blockchain. It only takes a few clicks!
              </p>
            <Link href="/mint">
            <button className="bg-white text-black font-bold px-8 py-3 rounded-full text-lg shadow-md hover:bg-zinc-200 transition-all duration-300 animate-pulse">
            Go to Mint Page →
            </button>
            </Link>
          </div>
        </div>


          {/* 🧾 Footer */}
          <footer className="w-full py-8 px-6 bg-zinc-950 border-t border-zinc-800 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
              <p>&copy; {new Date().getFullYear()} EtherKnights. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition">Contact</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Page;
