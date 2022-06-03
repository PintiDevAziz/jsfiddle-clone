import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
const Index = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [valid, setValid] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (
      password &&
      email &&
      email.matchAll(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) &&
      password.length > 5
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
    console.log(email + password)
  }, [password, email])
  const [user, userLoading, userError] = useAuthState(auth)

  const login = () => {
    if (valid) {
      signInWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err)
      })
    }
  }
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#1A1D21]">
      <div>Logo</div>
      <div className="flex flex-col ">
        <p className="mb-6 text-2xl font-semibold text-white">Log In 👋</p>
        <div className="flex w-[25rem] flex-col  rounded-lg border border-[#313438]">
          <label className="group relative flex h-[4.5rem] w-full items-center border-b  border-[#313438] bg-[#1F2227] px-4 ">
            <span
              className={`absolute text-sm ${
                email ? '-translate-y-5 text-sm opacity-75' : null
              }   text-textGray transition-all  group-focus-within:-translate-y-5 group-focus-within:text-sm  group-focus-within:opacity-75`}
            >
              Your Login
            </span>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="h-full w-full bg-transparent text-white  outline-none "
            />
          </label>
          <label className="group relative flex h-[4.5rem] w-full  items-center bg-[#1F2227] px-4 ">
            <span
              className={`absolute text-sm ${
                password ? '-translate-y-5 text-sm opacity-75' : null
              }  text-textGray transition-all group-focus-within:-translate-y-5 group-focus-within:text-sm  group-focus-within:opacity-75`}
            >
              Password
            </span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full bg-transparent text-white  outline-none "
            />
          </label>
        </div>
        <button
          onClick={login}
          disabled={!valid}
          className="mx-auto mt-10  flex h-[3rem] w-[6rem] items-center justify-center rounded-lg bg-[#2e71ff] font-semibold text-white disabled:opacity-50"
        >
          Log in
        </button>
        <div className="flex items-center justify-center gap-x-4  text-sm text-textGray  ">
          <Link href={'/user/signup'}>
            <a className={' mt-6  hover:underline '}>Sign Up</a>
          </Link>
          <Link href={'/user/rest_password'}>
            <a className={' mt-6  hover:underline '}>Reset Password</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
