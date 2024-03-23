import TableProvider from "@/providers/TableProvider"
import { useDashboard } from "@/providers/DashboardProvider"
import TableBody from "./TableBody"
import TableFooter from "./TableFooter"
import TableHead from "./TableHead"

const TransactionTable = () => {
  const { sales } = useDashboard()

  return (
    <TableProvider data={sales}>
      <table className="w-full border-t border-t-gray_1">
        <TableHead />
        <TableBody />
        {sales.length > 0 && <TableFooter />}
      </table>
    </TableProvider>
  )
}

export default TransactionTable
