import { useState, useEffect } from "react"
import getStartDate from "@/lib/getStartDate"

const useSales = (salesData, selectedPeriod: string) => {
  const [sales, setSales] = useState([])

  useEffect(() => {
    const init = async () => {
      if (salesData) {
        const startDate = getStartDate(selectedPeriod)
        const filteredSalesData = salesData.filter(
          (item) => new Date(item.purchasedAt).getTime() >= startDate,
        )
        setSales([...filteredSalesData])
      }
    }
    init()
  }, [selectedPeriod, salesData])

  return {
    sales,
  }
}

export default useSales
