import { getPublicClient } from "@/lib/clients"
import { CHAIN_ID, MINTER_ADDRESS } from "@/lib/consts"
import { useEffect, useState } from "react"
import abi from "@/lib/abi/ERC20FixedPriceSaleStrategy.json"

const useProtocolFeeRecipient = () => {
  const [protocolFeeRecipient, setProtocolFeeRecipient] = useState<`0x${string}` | null>(null)
  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(CHAIN_ID)
      const data = await publicClient.readContract({
        address: MINTER_ADDRESS as `0x${string}`,
        abi,
        functionName: "protocolFeeRecipient",
      })
      setProtocolFeeRecipient(data as `0x${string}`)
    }
    init()
  })

  return { protocolFeeRecipient }
}

export default useProtocolFeeRecipient
