import { useState, useEffect } from "react"
import getAssetTransfers from "@/lib/alchemy/getAssetTransfers"
import { CHAIN_ID } from "@/lib/consts"

const usePayoutActivity = (wallet: string) => {
  const [payoutActivity, setPayoutActivity] = useState([])

  useEffect(() => {
    const init = async () => {
      if (wallet) {
        const transferType = "payout"
        const payout = await getAssetTransfers(transferType, wallet, CHAIN_ID)
        setPayoutActivity(payout)
      }
    }

    init()
  }, [])

  return {
    payoutActivity,
  }
}

export default usePayoutActivity
