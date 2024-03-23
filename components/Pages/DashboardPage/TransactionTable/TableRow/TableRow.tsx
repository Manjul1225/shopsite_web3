import useIsMobile from "@/hooks/useIsMobile"
import getChainNetwork from "@/lib/getChainNetwork"
import truncateEthAddress from "@/lib/truncatedEthAddress"

const TableRow = ({ data }) => {
  const isMobile = useIsMobile()
  const itemClasses = `md:px-[20px] md:py-[16px] text-gray_7 text-[12px] leading-[16px]
  p-[10px]`

  const handleOpenTx = () => {
    const chain = getChainNetwork(data.product.chainId)
    const explorer = chain.blockExplorers.default.url
    const href = `${explorer}/tx/${data.transactionHash}`
    window.open(href, "_blank")
  }

  return (
    <tr className="border-b border-b-gray_1">
      <td className={itemClasses}>{data.product.productName}</td>
      <td className={itemClasses}>{new Date(data.purchasedAt).toDateString()}</td>
      <td className={`${itemClasses} !text-link`}>
        <button type="button" onClick={handleOpenTx}>
          {isMobile ? truncateEthAddress(data.transactionHash) : data.transactionHash}
        </button>
      </td>
      <td className={`${itemClasses}`}>
        <p>
          {data.customer.firstName} {data.customer.lastName}
        </p>
        <p>{data.customer.address1}</p>
        <p>
          {data.customer.zipCode}, {data.customer.state}, {data.customer.countryCode}
        </p>
      </td>
      <td className={itemClasses}>
        {isMobile ? (
          <>${data.product.priceInUsd * data.quantity}</>
        ) : (
          <>${data.product.priceInUsd * data.quantity}</>
        )}
      </td>
    </tr>
  )
}

export default TableRow
