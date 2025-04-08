import Head from "next/head";
import { useEffect, useState } from "react";
import CommonHeader from "@/components/Header";
import { connectBlockchain } from "@/utils/connectBlockchain";

export default function Home() {
  // State to track whether MetaMask is available in the browser
  const [hasMetaMask, setHasMetaMask] = useState(false);

  // State to store the connected account (if any)
  const [account, setAccount] = useState<string | null>(null);

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

  const handleConnect = async () => {
    /**
     * Call connectBlockchain (which wraps ethereum.request with 'eth_requestAccounts')
     * This prompts the MetaMask extension to connect accounts.
     */
    const accounts = await connectBlockchain();

    if (accounts && accounts.length > 0) {
      // Store the first account in state
      setAccount(accounts[0]);
    }
  };

  /**
   * - If MetaMask is not detected, show a warning.
   * - If the user is connected, show the address.
   * - Otherwise, show a connect button.
   */
  const renderContent = () => {
    if (!hasMetaMask) {
      return <p>MetaMask not detected. Please install it.</p>;
    }

    if (account) {
      return <p>Connected: {account}</p>;
    }

    return (
      <button
        onClick={handleConnect}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Connect Wallet
      </button>
    );
  };

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
        <div className="p-4 border rounded-md max-w-md mx-auto text-center">{renderContent()}</div>
      </main>
    </div>
  );
}
