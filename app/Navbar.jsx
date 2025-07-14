"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";      
import { useState,useEffect } from "react";


export default function Navbar({transparent = false}){
    const[query, setQuery] = useState("");
    const handleSearch = (e) =>{
      e.preventDefault();
      console.log("Searching for ", query);
    };
    
  const [walletAddress, setWalletAddress] = useState("");
  // Function to request wallet connection
  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Connected:", accounts[0]);
      } catch (err) {
        console.error("Connection error:", err);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };
    
    return (
     
        <div className={`navbar w-full h-16 flex items-center bg-zinc-900 
          ${transparent ? 'bg-zinc-900/20 backdrop-blur-xs' : 'bg-zinc-900 border-b-2 border-zinc-500'}`}>
          <form className="w-[300px] h-10 ml-16 flex">
            <input  
              className="p-2 w-full bg-zinc-700 rounded-tl-xl rounded-bl-xl focus:outline-none"
              type="text"
              placeholder="Search EtherKnights..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="w-10 h-full bg-zinc-700 rounded-tr-xl rounded-br-xl flex items-center justify-center cursor-pointer">
              <Search className="w-5 h-5" />
            </div>
          </form>
          <div className="w-[320px] h-10 ml-auto flex mr-6">
            <div className="h-full w-3/5 border-r-1 border-zinc-300">
            <h1 onClick={connectWallet} className='w-full h-full text-nowrap p-2 mr-2 cursor-pointer hover:text-zinc-50'>Connect to wallet</h1>
            </div>
            {walletAddress ? (
              <Image
              className="w-8 h-8 ml-5 mt-1 rounded-full"
              src={`https://api.dicebear.com/7.x/adventurer/png?seed\=${walletAddress}`}
              width={32}
              height={32}
              alt="Wallet Avatar"
              />
            ) : (
            <Image
            className="w-8 h-8 ml-5 mt-1"
            src="/user.png"
            width={32}
            height={32}
            alt="user login/signin"
            />
            )}
          </div>
        </div>
    );
}