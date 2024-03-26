import { CHAIN } from "@/lib/consts"
import { useEffect, useState } from "react"
import { Chain, WalletClient, createWalletClient, custom } from "viem"
import useConnectedWallet from "./useConnectedWallet"

const usePrivyWalletClient = () => {
  const { externalWallet } = useConnectedWallet()
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    const init = async () => {
      const provider = await externalWallet.getEthereumProvider()
      const response = createWalletClient({
        chain: CHAIN as Chain,
        account: externalWallet.address as `0x${string}`,
        transport: custom(provider),
      })
      setWalletClient(response)
    }

    if (!externalWallet) return
    init()
  }, [externalWallet])

  return { walletClient }
}

export default usePrivyWalletClient
