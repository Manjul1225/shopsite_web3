import getProductsByCartIds from "@/lib/firebase/getProductsByCartIds"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const usePurchasedProducts = () => {
  const [purchasedList, setPurchasedList] = useState([])
  const { query } = useRouter() as any

  useEffect(() => {
    const init = async () => {
      try {
        const purhcasedCart = JSON.parse(query?.purchasedCart)
        const response = await getProductsByCartIds(purhcasedCart)
        setPurchasedList(response.filter((item) => item))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
    if (!query?.purchasedCart) return
    init()
  }, [query])

  return {
    purchasedList,
  }
}

export default usePurchasedProducts
