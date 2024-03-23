import useConnectedWallet from "@/hooks/useConnectedWallet"
import usePayoutActivity from "@/hooks/usePayoutActivity"
import TableRow from "../TableRow"

const TableBody = () => {
  const { connectedWallet } = useConnectedWallet()
  const { payoutActivity } = usePayoutActivity(connectedWallet)

  return (
    <tbody>
      {payoutActivity.map((data) => (
        <TableRow key={data.uniqueId} data={data} />
      ))}
    </tbody>
  )
}

export default TableBody
