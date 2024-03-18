import updateDocument from "./firebase/updateDocument"

const purchaseCart = async (cart, transactionHash) => {
  try {
    const purchasePromise = cart.map(async (item) => {
      await updateDocument("carts", item.id, {
        quantity: item.quantity,
        purchased: true,
        purchasedAt: Date.now(),
        transactionHash,
      })
    })

    await Promise.all(purchasePromise)

    return true
  } catch (error) {
    return { error }
  }
}

export default purchaseCart
