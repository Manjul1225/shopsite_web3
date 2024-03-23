import getFormattedSales from "@/lib/getFormattedSales"
import getStartDate from "@/lib/getStartDate"
import { useEffect, useState } from "react"

const useLineChartData = (sales, selectedPeriod) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const init = async () => {
      const startDate = getStartDate(selectedPeriod)
      const formattedData = await getFormattedSales(sales, startDate)
      setChartData(formattedData)
    }

    if (!sales) return
    init()
  }, [sales])

  return {
    chartData,
  }
}

export default useLineChartData
