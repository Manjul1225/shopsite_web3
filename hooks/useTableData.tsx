import { useEffect, useState } from "react"

const useTableData = (data) => {
  const rowsPerPage = 5
  const preMaxPaginations = 3
  const lastPageIndex = Math.ceil(data?.length / rowsPerPage)
  const [selectedPageIndex, setSelectedPageIndex] = useState(1)
  const [rows, setRows] = useState([])

  const nextPage = () => {
    if (selectedPageIndex > lastPageIndex - preMaxPaginations) return
    setSelectedPageIndex(selectedPageIndex + 1)
  }

  const prevPage = () => {
    if (selectedPageIndex === 1) return
    setSelectedPageIndex(selectedPageIndex + -1)
  }

  useEffect(() => {
    if (data && selectedPageIndex) {
      const firstIndex = (selectedPageIndex - 1) * rowsPerPage
      const lastIndex = selectedPageIndex * rowsPerPage
      setRows(data.slice(firstIndex, lastIndex))
    }
  }, [selectedPageIndex, data])

  return {
    rowsPerPage,
    preMaxPaginations,
    lastPageIndex,
    selectedPageIndex,
    setSelectedPageIndex,
    prevPage,
    nextPage,
    rows,
  }
}

export default useTableData
