"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import Navbar from "../Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/constants";
import Image from "next/image";

function Listing() {
  const [account, setAccount] = useState(null);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchOwnedNFTs = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const balance = await contract.balanceOf(account);
      const nfts = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const tokenURI = await contract.tokenURI(tokenId);

        // Fetch metadata from IPFS or any other URL
        const response = await fetch(tokenURI);
        const metadata = await response.json();

        nfts.push({
          id: tokenId.toString(),
          image: metadata.image,
          name: metadata.name || `Token #${tokenId}`,
          description: metadata.description || "",
        });
      }

      setOwnedNFTs(nfts);
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      alert("Failed to fetch NFTs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-8">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">My NFT Listings</h1>

        {!account ? (
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-black font-semibold"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <button
              onClick={fetchOwnedNFTs}
              className="px-6 py-2 mt-4 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition"
            >
              Show My NFTs
            </button>

            {loading ? (
              <p className="mt-4 text-zinc-400">Fetching your NFTs...</p>
            ) : ownedNFTs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {ownedNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="bg-zinc-800 rounded-lg p-4 shadow-lg hover:shadow-zinc-400/20 transition-transform hover:scale-105"
                  >
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      width={300}
                      height={300}
                      className="rounded-md mb-4 object-cover w-full h-[200px]"
                    />
                    <h3 className="text-xl font-semibold">{nft.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{nft.description}</p>
                    <p className="text-zinc-500 text-xs mt-2">Token ID: #{nft.id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-zinc-500">No NFTs found for this wallet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Listing;
