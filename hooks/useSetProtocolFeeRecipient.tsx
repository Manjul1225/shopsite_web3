import abi from "@/lib/abi/ERC20FixedPriceSaleStrategy.json"
import { MINTER_ADDRESS } from "@/lib/consts"
import useConnectedWallet from "./useConnectedWallet"
import usePrivyWalletClient from "./usePrivyWalletClient"

const useSetProtocolFeeRecipient = () => {
  const { externalWallet } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const setProtocolFeeRecipient = async (newRecipient) => {
    await walletClient.writeContract({
      account: externalWallet.address as `0x${string}`,
      address: MINTER_ADDRESS as `0x${string}`,
      abi,
      functionName: "setProtocolFeeRecipient",
      args: [newRecipient],
    } as any)
  }

  return { setProtocolFeeRecipient }
}

export default useSetProtocolFeeRecipient
