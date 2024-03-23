import { useTable } from "@/providers/TableProvider"
import TableRow from "../TableRow"

const TableBody = () => {
  const { rows } = useTable()

  return (
    <tbody>
      {rows.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={data.id} data={data} />
      ))}
    </tbody>
  )
}

export default TableBody
