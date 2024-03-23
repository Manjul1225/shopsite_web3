import { useDashboard } from "@/providers/DashboardProvider"
import Select from "@/shared/Select"
import useLineChartData from "@/hooks/useLineChartData"
import periods from "./period.json"
import TransactionChart from "../TransactionChart"

const ChartSection = () => {
  const { sales, selectedPeriod, setSelectedPeriod } = useDashboard()
  const { chartData } = useLineChartData(sales, selectedPeriod)

  return (
    <div
      className="pt-[20px] border-t border-t-gray_3 mt-[20px] mb-[20px]
        md:px-[24px] lg:px-[32px] xl:px-[40px] px-[16px]"
    >
      <Select
        id="qantity"
        name="qantity"
        value={selectedPeriod}
        className="!w-[322px]"
        onChange={(e) => setSelectedPeriod(e.target.value)}
        options={periods}
      />
      <TransactionChart chartData={chartData} />
    </div>
  )
}

export default ChartSection
