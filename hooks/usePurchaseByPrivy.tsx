import { useRouter } from "next/router"
import { toast } from "react-toastify"
import handleTxError from "../lib/handleTxError"
import usePreparePrivyWallet from "./usePreparePrivyWallet"
import useErc20FixedPriceSaleStrategy from "./useErc20FixedPriceSaleStrategy"
import useUsdc from "./useUsdc"
import getRequestBatchConfig from "@/lib/getRequestBatchConfig"
import useConnectedWallet from "./useConnectedWallet"
import purchaseCart from "@/lib/purchaseCart"

const usePurchaseByPrivy = () => {
  const { push } = useRouter()
  const { prepare } = usePreparePrivyWallet()
  const { approveWithPrivy, balance, minterAllowance } = useUsdc()
  const { requestMintBatchByPrivy } = useErc20FixedPriceSaleStrategy()
  const { connectedWallet } = useConnectedWallet()

  const purchaseByPrivy = async (cart, totalPrice) => {
    if (!cart) return
    if (!connectedWallet) return
    if (!prepare()) return

    try {
      if (!balance) return
      const sufficientBalance = balance.gte(totalPrice)
      if (!sufficientBalance) {
        toast.error(`Insufficient balance. Total price is ${totalPrice}`)
        return
      }
      const sufficientAllowance = minterAllowance.gte(totalPrice)
      if (!sufficientAllowance) {
        toast.error(`Insufficient allowance. please sign initial tx to grant max allowance`)
        await approveWithPrivy()
      }
      const { targets, quantities, ids, minterArguments } = await getRequestBatchConfig(
        cart,
        connectedWallet,
      )
      const response = await requestMintBatchByPrivy(targets, ids, quantities, minterArguments)
      const { error } = response as any
      if (error) {
        return
      }
      const { transactionHash } = response as any
      const purchaseRes = await purchaseCart(cart, transactionHash)
      const { error: purchaseError } = purchaseRes as any
      if (purchaseError) {
        return
      }

      const cartIds = cart.map((item) => item.id)

      toast.success("purchased!")
      push({
        pathname: "/checkout/success",
        query: {
          purchasedCart: JSON.stringify(cartIds),
        },
      })
    } catch (err) {
      handleTxError(err)
    }
  }

  return { purchaseByPrivy }
}

export default usePurchaseByPrivy
