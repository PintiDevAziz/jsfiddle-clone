import { signOut } from 'firebase/auth'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsChatLeft } from 'react-icons/bs'
import { FiUploadCloud, FiPlay } from 'react-icons/fi'
import { VscSettings } from 'react-icons/vsc'
import { auth } from '../firebase/firebase'
const Header = ({ run }) => {
  const [user, userLoading, userError] = useAuthState(auth)
  return (
    <div className="flex h-16 w-full  items-center justify-between bg-baseBgDarker px-4">
      <div className="flex h-full items-center gap-x-6">
        <div className="">Logo</div>
        <label
          className="group relative flex h-full items-center gap-x-1 text-sm text-white "
          onClick={run}
        >
          <FiPlay className=" mr-1 text-base" />
          <p>Run</p>
          <div className="absolute bottom-0 h-0 w-full scale-75 rounded-md bg-themeBlue transition-all group-hover:h-[3px] group-hover:scale-100"></div>
        </label>
        <label className="group relative flex h-full items-center gap-x-1 text-sm text-white  ">
          <FiUploadCloud className=" mr-1 text-base" />
          <p>Save</p>
          <div className="absolute bottom-0 h-0 w-full scale-75 rounded-md bg-themeBlue transition-all group-hover:h-[3px] group-hover:scale-100"></div>
        </label>
        <label className="group relative flex h-full items-center gap-x-1 text-sm text-white  ">
          <BsChatLeft className=" mr-1 text-base" />
          <p>Collaborate</p>
          <div className="absolute bottom-0 h-0 w-full scale-75 rounded-md bg-themeBlue transition-all group-hover:h-[3px] group-hover:scale-100"></div>
        </label>
      </div>

      <div className="items-centern flex h-full gap-x-6">
        <label className="group relative flex h-full items-center gap-x-1 text-sm text-white  ">
          <VscSettings className=" mr-1 text-base" />
          <p>Settings</p>
          <div className="absolute bottom-0 h-0 w-full scale-75 rounded-md bg-themeBlue transition-all group-hover:h-[3px] group-hover:scale-100"></div>
        </label>
        {user ? (
          <div
            onClick={() => signOut(auth)}
            className="flex h-full items-center text-white cursor-pointer"
          >
            {user?.email.replace(/@gmail.com/g,'')}
          </div>
        ) : (
          <Link href={'/user/login'}>
            <a className="group relative flex h-full items-center gap-x-1 text-sm text-white  ">
              <p>Sign In</p>
              <div className="absolute bottom-0 h-0 w-full scale-75 rounded-md bg-themeBlue transition-all group-hover:h-[3px] group-hover:scale-100"></div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
