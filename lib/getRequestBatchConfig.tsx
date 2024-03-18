import { getEncodedMinterArgs } from "onchain-magic"

const getRequestBatchConfig = async (cart, adminWallet) => {
  const targets = cart.map((item) => item.product.contractAddress)
  const quantities = cart.map((item) => parseInt(item.quantity, 10))
  const ids = Array.from({ length: cart.length }).fill(1)
  const minterArgument = getEncodedMinterArgs(adminWallet, "purchased via MATTER")
  const minterArguments = Array.from({ length: cart.length }).fill(minterArgument)

  return {
    targets,
    quantities,
    ids,
    minterArguments,
  }
}

export default getRequestBatchConfig
