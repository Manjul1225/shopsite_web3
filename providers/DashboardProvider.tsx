import { createContext, useContext, useMemo, useState } from "react"
import useMySales from "@/hooks/useMySales"
import useMyListings from "@/hooks/useMyListings"
import useSales from "@/hooks/useSales"

const DashboardContext = createContext({} as any)

export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const myListings = useMyListings()
  const mySales = useMySales()
  const sales = useSales(mySales?.sales, selectedPeriod)

  const value = useMemo(
    () => ({
      selectedPeriod,
      setSelectedPeriod,
      ...myListings,
      ...sales,
    }),
    [myListings, sales],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
