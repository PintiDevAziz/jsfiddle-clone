import React, { useEffect, useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import { auth, db } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Input from '../../components/input'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
const Index = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [valid, setValid] = useState(false)
  const [error, setError] = useState(null)
  const [eye, setEye] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (
      password &&
      email &&
      userName &&
      email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?.length > 0 &&
      password.length > 5
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [password, email])
  const [user, userLoading, userError] = useAuthState(auth)

  const signUp = () => {
    if (valid) {
      createUserWithEmailAndPassword(auth, email, password)
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
        <p className={`mb-4 text-2xl font-semibold text-white `}>
          Create an account 🚀
        </p>
        <blockquote
          className={`mb-4   border-l-[3px] border-themeRed pl-2 text-sm  text-white ${
            error ? 'static scale-100' : 'absolute scale-0'
          }`}
        >
          Error : {error ? error?.replace('auth/', '') : null}
        </blockquote>
        <div className="flex w-[25rem] flex-col  overflow-hidden rounded-lg border border-[#313438]">
          <Input
            placeholder={'Username'}
            value={userName}
            type="text"
            setValue={setUserName}
          />
          <Input
            placeholder={'E-mail adress'}
            value={email}
            type={'email'}
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
        <p className="mx-auto mt-2 flex gap-x-1 text-sm text-textGray">
          By signing up you agree to our
          <Link href={'/temrs'}>
            <a className="underline hover:no-underline">terms</a>
          </Link>
          and
          <Link href={'/temrs'}>
            <a className="underline hover:no-underline">privacy</a>
          </Link>{' '}
          policy
        </p>
        <button
          onClick={signUp}
          disabled={!valid}
          className="mx-auto mt-10  flex h-[3rem] w-[12rem] items-center justify-center rounded-lg bg-[#2e71ff] font-semibold text-white disabled:opacity-50"
        >
          Create an account
        </button>
        <div className="flex items-center justify-center gap-x-4  text-sm text-textGray  ">
          <Link href={'/user/login'}>
            <a className={' mt-6  hover:underline '}>Log in</a>
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
