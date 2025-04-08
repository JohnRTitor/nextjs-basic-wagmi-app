export const connectBlockchain = async (): Promise<string[] | null> => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } catch (error) {
      console.error("User rejected connection", error);
      return null;
    }
  } else {
    console.warn("MetaMask not found");
    return null;
  }
};
