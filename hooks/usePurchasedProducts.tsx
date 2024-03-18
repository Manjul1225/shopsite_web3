import getLatestPurchasedItems from "@/lib/firebase/getLatestPurchasedItems"
import { useUserProvider } from "@/providers/UserProvider"
import { useEffect, useState } from "react"

const usePurchasedProducts = () => {
  const { userData } = useUserProvider()
  const [purchasedList, setPurchasedList] = useState([])

  useEffect(() => {
    const init = async () => {
      const response = await getLatestPurchasedItems(userData?.id)
      setPurchasedList(response)
    }

    if (!userData) return
    init()
  }, [userData])

  return {
    purchasedList,
  }
}

export default usePurchasedProducts
