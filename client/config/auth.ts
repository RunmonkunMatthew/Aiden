import type { User } from "../src/types";
import { auth} from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup,signOut, } from "firebase/auth";
import {saveUserToStorage, serverTimestamp} from './storage'


export async function createAccount(email:string, password:string) {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = await res.user;
    console.log(user);
    
    
    let newUser: User = {
      id: res.user.uid,
      email: res.user.email,
      chats: {},
    }

    saveUserToStorage(newUser, newUser.id);
 
}

export async function loginAccount(email:string, password: string) {

    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = await res.user;
    
    return user
 
}

export async function resetPassword(email:string) {
  try {
    const res = sendPasswordResetEmail(auth, email);
    return {success: true}
  } catch (error) {
    console.log(error);
  
  }
}

export async function signUserOut() {
  await signOut(auth)
}



