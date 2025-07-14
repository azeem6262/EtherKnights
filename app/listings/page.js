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

  // Helper function to convert IPFS URI to HTTP gateway URL
  const convertIPFSToHTTP = (ipfsUri) => {
    if (ipfsUri.startsWith("ipfs://")) {
      return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsUri;
  };

  const fetchOwnedNFTs = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const totalSupply = await contract.totalSupply();
      const nfts = [];

      for (let tokenId = 21; tokenId <= totalSupply; tokenId++) {
        try {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() === account.toLowerCase()) {
            const tokenURI = await contract.tokenURI(tokenId);
            const response = await fetch(convertIPFSToHTTP(tokenURI));
            if (!response.ok) throw new Error("Metadata fetch failed");
            const metadata = await response.json();

            nfts.push({
              id: tokenId.toString(),
              image: convertIPFSToHTTP(metadata.image),
              name: metadata.name || `Token #${tokenId}`,
              description: metadata.description || "",
            });
          }
        } catch (err) {
          console.log(`Skipping token ${tokenId}:`, err.message);
        }
      }

      setOwnedNFTs(nfts.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      alert("Failed to fetch NFTs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="ml-16">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto mt-10">
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
            <p className="text-zinc-400 mb-4">Connected: {account}</p>
            <button
              onClick={fetchOwnedNFTs}
              className="px-6 py-2 mt-4 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition"
            >
              Show My NFTs
            </button>

            {loading ? (
              <p className="mt-4 text-zinc-400">Fetching your NFTs...</p>
            ) : ownedNFTs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                {ownedNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:shadow-lg transition-transform hover:scale-105"
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/fallback.png";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white">{nft.name}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{nft.description}</p>
                      <p className="text-xs text-zinc-500 mt-2">Token ID: #{nft.id}</p>
                    </div>
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
