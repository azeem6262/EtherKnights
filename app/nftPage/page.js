"use-client"
import React from 'react';
import Navbar from '../Navbar';
import Image from 'next/image';

const nftData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Croc #${String(i + 1).padStart(3, '0')}`,
  image: `/nfts/croc${i + 1}.png`, // Example: Use 4 sample croc images
}));

function Page() {
  return (
    <div className="flex flex-col ml-16 w-full min-h-screen relative bg-zinc-900">
      {/* Navbar on top of banner */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar transparent />
      </div>

      {/* Banner */}
      <div className="banner w-full h-[500px] overflow-hidden object-cover">
        <Image
          className="w-full h-full"
          src="/bannerforcrocs.png"
          width={1200}
          height={500}
          alt="Banner for the Crocs"
        />
      </div>

      {/* Collection Metadata Section */}
      <div className="z-30 relative mt-[-100px] mb-10 px-10">
        <h1 className="text-4xl font-bold text-white mb-2">Fluent Crocs</h1>
        <p className="text-zinc-400">100 unique crocs living on the blockchain.</p>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-4 gap-6 px-10 z-30 relative pb-20">
        {nftData.map((nft) => (
          <div
            key={nft.id}
            className="bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-zinc-400/20 transition-transform hover:scale-105 cursor-pointer"
          >
            <Image
              src={nft.image}
              alt={nft.name}
              width={300}
              height={300}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-white text-lg">{nft.name}</h3>
              <p className="text-sm text-zinc-400">Price: 0.05 ETH</p>
              <button className='p-1 mt-2 w-15 h-8 rounded-2xl bg-blue-500'>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
