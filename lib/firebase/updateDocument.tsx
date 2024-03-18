import { doc, updateDoc } from "firebase/firestore"
import { db } from "./db"

const updateDocument = async (collectionName, documentId, data) => {
  try {
    await updateDoc(doc(db, collectionName, documentId), data)
    return true
  } catch (error) {
    return { error }
  }
}

export default updateDocument
