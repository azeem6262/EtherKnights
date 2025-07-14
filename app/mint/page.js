"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "../Navbar";
import Image from "next/image";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/constants";

function MintPage() {
  const [account, setAccount] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastMintedTokenId, setLastMintedTokenId] = useState(null);

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
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleMint = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      setIsMinting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const mintAmount = 1;

      const tx = await contract.mint(mintAmount, {
        value: ethers.parseEther((0.001 * mintAmount).toString())
      });

      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      // Get the new token ID from the transaction events
      let newTokenId;
      try {
        // Try to get token ID from Transfer event
        const transferEvent = receipt.logs.find(log => 
          log.topics[0] === ethers.id("Transfer(address,address,uint256)")
        );
        
        if (transferEvent) {
          newTokenId = parseInt(transferEvent.topics[3], 16);
        } else {
          // Alternative: get total supply to estimate the new token ID
          const totalSupply = await contract.totalSupply();
          newTokenId = totalSupply.toString();
        }
      } catch (error) {
        console.error("Error getting token ID from event:", error);
        // Fallback: get total supply
        const totalSupply = await contract.totalSupply();
        newTokenId = totalSupply.toString();
      }

      console.log("New token ID:", newTokenId);
      setLastMintedTokenId(newTokenId);
      
      alert(`Minted successfully! Token ID: ${newTokenId}`);
    } catch (err) {
      console.error("Mint failed:", err);
      
      // More detailed error messages
      if (err.code === 'INSUFFICIENT_FUNDS') {
        alert("Insufficient funds for minting fee and gas."); 
      } else if (err.code === 'USER_REJECTED') {
        alert("Transaction rejected by user.");
      } else {
        alert(`Mint failed: ${err.message || 'Unknown error'}`);
      }
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
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-black font-semibold transition"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md space-y-4">
              <div className="mb-4">
                <p className="text-sm text-zinc-400">Connected Wallet:</p>
                <p className="text-xs text-zinc-300 font-mono">{account}</p>
              </div>

              <div className="bg-zinc-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Mint Details</h3>
                <p className="text-sm text-zinc-300">Price: 0.001 ETH</p>
                <p className="text-sm text-zinc-300">Amount: 1 NFT</p>
              </div>

              <button
                onClick={handleMint}
                className="w-full py-3 bg-blue-400 text-black font-semibold rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isMinting}
              >
                {isMinting ? "Minting..." : "Mint NFT"}
              </button>

              {/* Show last minted token ID */}
              {lastMintedTokenId && (
                <div className="bg-green-800 p-4 rounded-lg"> 
                  <p className="text-sm text-green-200">
                    ✅ Successfully minted Token ID: #{lastMintedTokenId}
                  </p>
                  <p className="text-xs text-green-300 mt-1">
                    Check your collection to view the NFT!
                  </p>
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