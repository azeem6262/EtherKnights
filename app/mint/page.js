"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "../Navbar";
import Image from "next/image";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/constants";

function MintPage() {
  const [account, setAccount] = useState(null);
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    "/mint1.jpg",
    "/mint2.jpg",
    "/mint3.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleMint = async () => {
    try {
      setIsMinting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const mintAmount = 1;

      const tx = await contract.mint(mintAmount, {
        value: ethers.parseEther((0.001 * mintAmount).toString())
      });

      await tx.wait();
      alert("Minted successfully!");
    } catch (err) {
      console.error("Mint failed:", err);
      alert("Mint failed. See console.");
    } finally {
      setIsMinting(false);
    }
  };

  

  return (
    <div className="ml-16 w-full h-screen bg-zinc-900">
      <Navbar />
      <div className="flex flex-1 w-full min-h-screen bg-zinc-900 text-white">
       

      {/* Left Section: Minting UI */}
      <div className="w-1/2 h-screen p-10 flex flex-col justify-center items-start space-y-6">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Studio</h1>
        <p className="text-zinc-300 text-md mb-4">
          Mint your own NFT securely on the blockchain. Upload your artwork to IPFS, connect your wallet, and launch your next masterpiece into the decentralized world.
        </p>

        {!account ? (
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-black font-semibold"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md space-y-4">
            <input
              type="number"
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="IPFS Token URI (if needed)"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none"
            />
            <button
              onClick={handleMint}
              className="w-full py-3 bg-blue-400 text-black font-semibold rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              disabled={isMinting}
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </button>

            

            {ownedTokens.length > 0 && (
              <div className="mt-4 bg-zinc-700 p-4 rounded">
                <h2 className="text-xl mb-2">Your Token IDs:</h2>
                <ul className="list-disc list-inside">
                  {ownedTokens.map((id) => (
                    <li key={id}>Token #{id}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Auto-Sliding Banner */}
      <div className="w-1/2 relative hidden md:flex items-center justify-center transition-shadow">
        <Image
          src={bannerImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={800}
          height={600}
          className="object-cover w-full h-full rounded-md transition-all duration-700"
        />
      </div>
      </div>
    </div>
  );
}

export default MintPage;
