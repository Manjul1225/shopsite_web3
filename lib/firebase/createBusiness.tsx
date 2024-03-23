import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./db"
import handleTxError from "../handleTxError"

const createBusinessAccount = async (businessData, customerId) => {
  try {
    const data = {
      ...businessData,
      timestamp: Date.now(),
      isApproved: false,
      verifiedAt: 0,
    }

    const q = query(collection(db, "business"), where("customerId", "==", customerId))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      await updateDoc(doc(db, "business", querySnapshot.docs[0].id), businessData)
      return querySnapshot.docs[0].id
    }

    const newDoc = await addDoc(collection(db, "business"), data)
    return newDoc.id
  } catch (error) {
    handleTxError(error)
    return { error }
  }
}

export default createBusinessAccount
