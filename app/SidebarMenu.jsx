"use client";
import { Panda, Aperture, List, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function SidebarMenu() {
  return (
    <div className="group fixed z-30 h-screen bg-zinc-900 text-white transition-all duration-800 fade-in-out border-r-2 border-zinc-500 w-16 hover:w-56 p-4">
      <div className="flex items-center gap-2 text-xl font-bold mb-6">
        <Link href="/" className="flex items-center gap-2">
          <Panda className="w-6 h-6" />
          <span className="hidden group-hover:inline">EtherKnights</span>
        </Link>
      </div>

      <ul className="space-y-6 mt-10">
        <li>
          <Link href="/mint" className="flex items-center gap-3 hover:underline">
            <Aperture className='w-5 h-5' />
            <span className="hidden group-hover:inline">Studio</span>
          </Link>
        </li>
        <li>
          <Link href="/listings" className="flex items-center gap-3 hover:underline">
            <List className="w-5 h-5" />
            <span className="hidden group-hover:inline">My Listings</span>
          </Link>
        </li>
        <li>
          <Link href="/buy" className="flex items-center gap-3 hover:underline">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden group-hover:inline">Marketplace</span>
          </Link>
        </li>
      </ul>

      {/* Overlay triggered by sidebar hover */}
      <div className="absolute top-0 left-full w-[calc(100vw-4rem)] h-full z-20 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
