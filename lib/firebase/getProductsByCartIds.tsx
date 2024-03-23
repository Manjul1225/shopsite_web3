import getBusinessByCustomerId from "./getBusinessByCustomerId"
import getDocument from "./getDocument"

const getProductsByCartIds = async (cartIds) => {
  try {
    const latestItemsPromise = cartIds.map(async (cartId) => {
      const cart = (await getDocument("carts", cartId)) as any
      const { error } = cart
      if (error) return null
      const product = (await getDocument("products", cart.productId)) as any
      const customer = (await getDocument("customers", cart.customerId)) as any
      const business = (await getBusinessByCustomerId(cart.customerId)) as any
      return {
        id: cart.id,
        ...cart,
        product: {
          id: product.id,
          ...product,
        },
        customer: {
          id: customer.id,
          ...customer,
        },
        business,
      }
    })
    return await Promise.all(latestItemsPromise)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return []
  }
}

export default getProductsByCartIds
