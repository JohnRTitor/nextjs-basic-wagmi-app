"use client";

import Head from "next/head";
import CommonHeader from "@/components/Header";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "@wagmi/connectors";

export default function Home() {
  // State to track whether MetaMask is available in the browser
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    /**
     * Check for MetaMask client-side only.
     * In Next.js, "window" is not available during Server-Side Rendering (SSR),
     * so we must wrap it inside a useEffect (which only runs on the client).
     */
    if (typeof window !== "undefined" && window.ethereum) {
      setHasMetaMask(true);
    }
  }, []);

  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Blockchain Connect Demo!</title>
        <meta
          name="description"
          content="Demo for connecting to blockchain using Ethers.js, Next.js and Tailwind CSS."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Common layout header */}
      <CommonHeader />

      {/* Main content: either shows connect button, connected account, or a MetaMask warning */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="p-4 border rounded-md max-w-md mx-auto text-center">
          {!hasMetaMask ? (
            <div>
              <p>MetaMask is not available.</p>
              <p>Please install MetaMask to continue.</p>
            </div>
          ) : !isConnected ? (
            <div>
              <p>Connect your wallet to continue.</p>
              <br />
              <button
                onClick={() => connect({ connector: injected() })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div>
              <p>Connected to {address}</p>
              <p className="text-gray-400 mb-4">
                Balance:{" "}
                <span className="font-semibold">
                  {balance?.formatted} {balance?.symbol}
                </span>
              </p>
              <br />
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
