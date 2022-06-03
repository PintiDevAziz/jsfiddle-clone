import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
const index = () => {
  const [user, userLoading, userError] = useAuthState(auth)
  return (
    <div>
      {user?.email}
      <button
        onClick={() => {
          signOut(auth)
        }}
      >Log Out</button>
    </div>
  )
}

export default index
