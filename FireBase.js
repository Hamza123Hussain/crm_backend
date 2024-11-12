import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import {
  apiKey,
  appId,
  projectId,
  authDomain,
  messagingSenderId,
  storageBucket,
} from './Config.js'

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const Auth = getAuth(app)
export const Storage = getStorage(app)
