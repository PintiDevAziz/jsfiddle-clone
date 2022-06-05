import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Input from '../../components/input'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const Index = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [valid, setValid] = useState(false)
  const [error, setError] = useState()
  const [eye, setEye] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (
      password &&
      email &&
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?.length > 0 &&
      password.length > 5
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [password, email])
  const [user, userLoading, userError] = useAuthState(auth)

  const login = () => {
    if (valid) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setError(null)
        })
        .catch((err) => {
          setError(err.code)
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
      <div className="relative mb-10 h-[7rem] w-[10rem] ">
        <Image
          src="/static/darkLogo.png"
          layout="fill"
          placeholder="blur"
          blurDataURL="/static/darkLogo.png"
        />
      </div>
      <div className="flex flex-col ">
        <p className="mb-6 text-2xl font-semibold text-white">Log In 👋</p>
        <blockquote
          className={`mb-4   border-l-[3px] border-themeRed pl-2 text-sm  text-white ${
            error ? 'static scale-100' : 'absolute scale-0'
          }`}
        >
          Error : {error ? error?.replace('auth/', '') : null}
        </blockquote>
        <div className="flex w-[25rem] flex-col  overflow-hidden rounded-lg border border-[#313438]">
          <Input
            placeholder={'E-mail'}
            type={'email'}
            value={email}
            setValue={setEmail}
          />
          <label className="relative flex items-center">
            <Input
              placeholder={'Password'}
              value={password}
              type={eye ? 'password' : 'text'}
              setValue={setPassword}
            />
            <div
              onClick={() => setEye(!eye)}
              className="absolute right-2 z-[99] text-xl text-textGray transition-all"
            >
              {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
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
          <Link href={'/user/reset_password'}>
            <a className={' mt-6  hover:underline '}>Reset Password</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
