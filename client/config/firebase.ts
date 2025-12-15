import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore, collection, getDocs, serverTimestamp} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAjWgGqERNlKzaHyimqPzLUUVLGq1l1x2E",
  authDomain: "aidenb6901.firebaseapp.com",
  projectId: "aidenb6901",
  storageBucket: "aidenb6901.firebasestorage.app",
  messagingSenderId: "246530850860",
  appId: "1:246530850860:web:a6adae092d31ec67acd189",
  measurementId: "G-SNFHQW42V9"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()


export{
  db, auth
}