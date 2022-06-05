import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Input from '../../components/input'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const Index = () => {
  const [email, setEmail] = useState('')
  const [valid, setValid] = useState(false)
  const [error, setError] = useState(null)
  const [showInfo, setShoInfo] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (email && email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?.length > 0) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [email])
  const [user, userLoading, userError] = useAuthState(auth)

  const sendResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null)
        setShoInfo(true)
      })
      .catch((err) => {
        setError(err.code)
        setShoInfo(false)
      })
  }
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])
  return (
    <div
      className={`flex h-screen w-full flex-col items-center ${
        showInfo ? 'justify-start pt-10' : 'justify-center'
      } bg-[#1A1D21]`}
    >
      {showInfo ? (
        <div className="flex w-[25rem] flex-col">
          <div className="relative mx-auto mb-10 h-[7rem] w-[10rem] ">
            <Image
              src="/static/darkLogo.png"
              layout="fill"
              placeholder="blur"
              blurDataURL="/static/darkLogo.png"
            />
          </div>
          <h1 className="mb-6 text-2xl font-semibold text-white">
            Password reset successful
          </h1>
          <p className="text-sm text-white">
            We've e-mailed you instructions for setting your password to the
            e-mail address you submitted. You should be receiving it shortly.
          </p>
          <Link href={'/user/login'}>
            <a className='text-white underline hover:no-underline text-sm mt-4 mx-auto'>Go to Login Page</a>
          </Link>
        </div>
      ) : (
        <>
          <div className="relative mb-10 h-[7rem] w-[10rem] ">
            <Image
              src="/static/darkLogo.png"
              layout="fill"
              placeholder="blur"
              blurDataURL="/static/darkLogo.png"
            />
          </div>
          <div className="flex flex-col ">
            <p className="mb-6 text-2xl font-semibold text-white">
              Forgot your password? 🤫
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
                placeholder={'E-mail adress'}
                type={'email'}
                value={email}
                setValue={setEmail}
              />
            </div>
            <button
              onClick={sendResetEmail}
              disabled={!valid}
              className="mx-auto mt-10  flex h-[3rem] w-[10rem] items-center justify-center rounded-lg bg-[#2e71ff] font-semibold text-white disabled:opacity-50"
            >
              Reset Password
            </button>
            <div className="flex items-center justify-center gap-x-4  text-sm text-textGray  ">
              <Link href={'/user/login'}>
                <a className={' mt-6  hover:underline '}>Login</a>
              </Link>
              <Link href={'/user/signup'}>
                <a className={' mt-6  hover:underline '}>Sign up</a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Index
