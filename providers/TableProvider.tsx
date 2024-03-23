import useTableData from "@/hooks/useTableData"
import React, { createContext, useContext, useMemo, useState } from "react"

const TableContext = createContext(null)

const TableProvider = ({ children, data }) => {
  const tableData = useTableData(data)

  const value = useMemo(
    () => ({
      ...tableData,
    }),
    [tableData],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const useTable = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}

export default TableProvider
