import { and, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "./db"
import getBusinessByCustomerId from "./getBusinessByCustomerId"

const getLatestPurchasedItems = async (userId) => {
  try {
    const q = query(
      collection(db, "carts"),
      and(where("buyerId", "==", userId), where("purchased", "==", true)),
      orderBy("purchasedAt", "desc"),
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      const latestItemsPromise = querySnapshot.docs.map(async (data) => {
        const product = await getDoc(doc(db, "products", data.data().productId))
        const customer = await getDoc(doc(db, "customers", data.data().customerId))
        const business = await getBusinessByCustomerId(data.data().customerId)
        return {
          id: data.id,
          ...data.data(),
          product: {
            id: product.id,
            ...product.data(),
          },
          customer: {
            id: customer.id,
            ...customer.data(),
          },
          business,
        }
      })
      return await Promise.all(latestItemsPromise)
    }

    return []
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return []
  }
}

export default getLatestPurchasedItems
