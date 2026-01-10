import {db} from './firebase';
import {collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";



export async function saveUserToStorage(newUser:object, id: string) {
  const docRef = doc(db, "Users", id);

  await setDoc(docRef, newUser)
  return {success: true}
}

export async function  saveChatToStorage(message: object, id: string) {
  const docRef = doc(db, "chats", id);

  await setDoc(docRef, message, )
  return {success: true}
}

export {serverTimestamp}