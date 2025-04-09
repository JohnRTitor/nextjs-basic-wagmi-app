import { createConfig, fallback, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

// environment variables are defined in .env.local
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
const mainnetRpcUrl = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
if (!sepoliaRpcUrl) {
  console.error("Missing NEXT_PUBLIC_SEPOLIA_RPC_URL in environment variables.");
}
if (!mainnetRpcUrl) {
  console.error("Missing NEXT_PUBLIC_MAINNET_RPC_URL in environment variables.");
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: fallback([http(mainnetRpcUrl)]),
    [sepolia.id]: fallback([
      http(sepoliaRpcUrl),
      http("https://ethereum-sepolia-rpc.publicnode.com"),
    ]),
  },
});
