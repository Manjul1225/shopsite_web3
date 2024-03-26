import { Chain, createPublicClient, http } from "viem"
import getViemNetwork from "./getViemNetwork"

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(),
  })
  return publicClient
}
