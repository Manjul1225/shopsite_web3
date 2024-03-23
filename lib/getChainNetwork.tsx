import { mainnet, sepolia } from "viem/chains"

const getChainNetwork = (chainId) => {
  switch (chainId) {
    case sepolia.id:
      return sepolia
    default:
      return mainnet
  }
}

export default getChainNetwork
