import { useCallback, useEffect, useState } from "react"
import getCartsByBuyerId from "../lib/firebase/getCartsByBuyerId"
import { useUserProvider } from "../providers/UserProvider"

const useMySales = () => {
  const [sales, setSales] = useState([])
  const { userData } = useUserProvider()

  const getSales = useCallback(async () => {
    if (!userData) return

    const response = await getCartsByBuyerId(userData.id, true)
    setSales(response)
  }, [userData])

  useEffect(() => {
    getSales()
  }, [getSales])

  return {
    sales,
    getSales,
  }
}

export default useMySales
