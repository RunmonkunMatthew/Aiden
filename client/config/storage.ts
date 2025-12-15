import {db} from './firebase';
import { doc, setDoc } from "firebase/firestore";



export async function saveUserToStorage(newUser:object, id: string) {
  const docRef = doc(db, "Users", id);

  await setDoc(docRef, newUser)
  return {success: true}
}