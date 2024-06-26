import { addDoc, and, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./db"

const createCart = async (cartData) => {
  const data = {
    ...cartData,
    purchased: false,
    createdAt: Date.now(),
    purchasedAt: null,
  }

  const q = query(
    collection(db, "carts"),
    and(
      where("productId", "==", cartData.productId),
      where("buyerId", "==", cartData.buyerId),
      where("purchased", "==", false),
    ),
  )
  const querySnapshot = await getDocs(q)

  if (querySnapshot.size) return querySnapshot.docs[0].id

  const newCart = await addDoc(collection(db, "carts"), data)
  return newCart.id
}

export default createCart
