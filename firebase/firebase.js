import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyCaJw7lB7sA8mlTK_3O-GuDTu5t-VjiqQk',
  authDomain: 'js-fiddle-clone-fad2b.firebaseapp.com',
  projectId: 'js-fiddle-clone-fad2b',
  storageBucket: 'js-fiddle-clone-fad2b.appspot.com',
  messagingSenderId: '1029984305579',
  appId: '1:1029984305579:web:e664d1ac43534c4057d2ee',
}
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

export { app, auth, db }
