import useIsMobile from "@/hooks/useIsMobile"
import truncateEthAddress from "@/lib/truncatedEthAddress"
import getChainNetwork from "@/lib/getChainNetwork"
import { CHAIN_ID } from "@/lib/consts"
import getDateString from "@/lib/getDateString"
import getTimeString from "@/lib/getTimeString"
import getLocalTimeZone from "@/lib/getLocalTimeZone"
import { formatUnits } from "viem"

const TableRow = ({ data }) => {
  const isMobile = useIsMobile()
  const itemClasses = `md:px-[20px] md:py-[16px] text-gray_7 text-[12px] leading-[16px] p-[10px] border border-gray_1`

  const { hash: transactionHash, rawContract, metadata } = data
  const amount = parseFloat(formatUnits(BigInt(rawContract?.value || 0), 6))
  const blockTimestamp = metadata?.blockTimestamp

  const handleOpenTx = () => {
    const chain = getChainNetwork(CHAIN_ID)
    const explorer = chain.blockExplorers.default.url
    const href = `${explorer}/tx/${transactionHash}`
    window.open(href, "_blank")
  }
  const timestampDate = getDateString(blockTimestamp)
  const timestampTime = getTimeString(blockTimestamp)
  const timestampZone = getLocalTimeZone()

  return (
    <tr>
      <td className={itemClasses}>
        {isMobile ? (
          <>
            {timestampDate}
            <br />
            {timestampTime}
            <br />
            {timestampZone}
          </>
        ) : (
          <>
            {timestampDate} {timestampTime} {timestampZone}
          </>
        )}
      </td>
      <td className={itemClasses}>
        {isMobile ? (
          <>
            {amount} <br /> USDC
          </>
        ) : (
          `${amount} USDC`
        )}
      </td>
      <td className={`${itemClasses} !text-link`}>
        <button type="button" onClick={handleOpenTx}>
          {isMobile ? truncateEthAddress(transactionHash) : transactionHash}
        </button>
      </td>
      <td className={itemClasses}>
        <p className="text-[12px] leading-[16px]">Successful</p>
      </td>
    </tr>
  )
}

export default TableRow
