import axios from "axios"
import getAlchemyRpcUrl from "./getAlchemyRpcUrl"
import { AlchemyParamsType } from "../types"

const getAssetTransfers = async (transferType: string, wallet: string, chainId: any) => {
  const endpoint = getAlchemyRpcUrl(chainId)
  const params: AlchemyParamsType = [
    {
      fromBlock: "0x0",
      toBlock: "latest",
      category: ["external", "erc20", "erc721", "erc1155", "specialnft"],
      withMetadata: true,
      excludeZeroValue: true,
    },
  ]
  if (transferType === "payout") {
    params[0].fromAddress = wallet
  }
  if (transferType === "sales") {
    params[0].toAddress = wallet
  }

  const payload = {
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params,
  }

  try {
    const transactions = await axios.post(endpoint, payload)
    return transactions.data?.result?.transfers
  } catch {
    return []
  }
}

export default getAssetTransfers
