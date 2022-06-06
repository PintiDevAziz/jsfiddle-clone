import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className=" flex h-full w-64 flex-col justify-between border-r  border-r-borderGray">
      <div className="p-3">
        <h2 className="text-whiet mb-3 font-semibold text-white">
          Fiddle meta
        </h2>
        <input
          type="text"
          required
          className="mb-3 h-8 w-full  rounded border-b-themeBlue  bg-baseBgDarker   px-2 text-sm  text-white  outline-none placeholder:text-sm placeholder:text-textGray valid:border-b focus-within:border-0 focus-within:outline-themeBlue  focus:outline-2"
          placeholder="Untitled fiddle"
        />
        <input
          type="text"
          required
          className="h-14 w-full    rounded border-b-themeBlue  bg-baseBgDarker   px-2 text-sm  text-white  outline-none placeholder:text-sm placeholder:text-textGray valid:border-b focus-within:border-0 focus-within:outline-themeBlue  focus:outline-2"
          placeholder="No Description"
        />
      </div>
      <div className="h-36  border-t-2 border-themeYellow p-4">
        <p className="text-white text-sm font-semibold mb-3">
          Support the development of JSFiddle and get extra features ✌🏻
        </p>
        <Link href={'/extra'}>
          <a className="bg-themeYellow text-sm h-8 w-[75%] flex items-center justify-center px-2  rounded">Become a supporter</a>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
