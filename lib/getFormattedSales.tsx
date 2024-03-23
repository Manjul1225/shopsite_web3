import ISOToLocaleString from "./ISOToLocaleString"

const getFormattedSales = async (rawSales, startDate) => {
  try {
    const groupedData = rawSales.reduce((acc: any, curr: any) => {
      if (!acc[curr?.purchasedAt]) {
        acc[curr?.purchasedAt] = 0
      }
      acc[curr?.purchasedAt] += (curr?.quantity || 0) * (curr?.product?.priceInUsd || 0)
      return acc
    }, {})

    const results = Object.entries(groupedData).map(([timestamp, totalValue]: any) => ({
      name: ISOToLocaleString(new Date(parseInt(timestamp, 10))),
      uv: totalValue,
    }))

    const startData = results.filter(
      (item) => item.name === ISOToLocaleString(new Date(parseInt(startDate, 10))),
    )
    if (!startData.length)
      results.splice(0, 0, {
        name: ISOToLocaleString(new Date(parseInt(startDate, 10))),
        uv: 0,
      })
    return results
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return []
  }
}

export default getFormattedSales
