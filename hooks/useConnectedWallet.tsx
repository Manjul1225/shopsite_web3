import { useWallets } from "@privy-io/react-auth"
import { useMemo } from "react"

const useConnectedWallet = () => {
  const { wallets } = useWallets()
  const privyWallet = wallets?.find((wallet) => wallet.walletClientType === "privy")
  const connectedWallet = privyWallet?.address
  const externalWallets = useMemo(
    () => wallets?.filter((wallet) => wallet.walletClientType !== "privy"),
    [wallets],
  )

  return {
    connectedWallet,
    privyWallet,
    externalWallet: externalWallets?.length ? externalWallets[0] : null,
  }
}

export default useConnectedWallet
