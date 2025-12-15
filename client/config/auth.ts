import type { User } from "../src/types";
import { auth} from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {saveUserToStorage} from './storage'


export async function createAccount(email:string, password:string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = await res.user;
    console.log(user);
    
    
    let newUser: User = {
      id: res.user.uid,
      email: res.user.email,
      chats: {},
    }

    saveUserToStorage(newUser, newUser.id);
    
  } catch (error) {
    console.log(error);
    
  }
}

export async function loginAccount(email:string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = await res.user;
    console.log(user);
    
    return user
  } catch (error) {
    console.log(error);
  }
}

export async function resetPassword(email:string) {
  try {
    const res = sendPasswordResetEmail(auth, email);
    return {success: true}
  } catch (error) {
    console.log(error);
    
  }
}



