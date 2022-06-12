import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
const Sidebar = ({ setTitle, setDescripton, htmlVal, cssVal, jsVal }) => {
  const [mousePositon, setMousePosition] = useState({
    x: 0,
    y: 0,
    hovered: false,
  })

  const buttonRef = useRef()
  const downloadFiles = () => {
    let zip = new JSZip()
    zip.file('index.html', htmlVal)
    zip.file('style.css', cssVal)
    zip.file('app.js', jsVal)
    zip.file('description.md', description)
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${title || 'codes'}.zip`)
    })
  }
  return (
    <div className=" flex h-full w-64 flex-col justify-between border-r  border-r-borderGray">
      <div className="flex h-full  flex-col p-3">
        <h2 className="text-whiet mb-3 font-semibold text-white">
          Fiddle meta
        </h2>
        <input
          type="text"
          required
          onChange={(e) => {
            setTitle(e.target.value || 'Untitled Fiddle')
          }}
          className="mb-3 h-8 w-full  rounded border-b-themeBlue  bg-baseBgDarker   px-2 text-sm  text-white  outline-none placeholder:text-sm placeholder:text-textGray valid:border-b focus-within:border-0 focus-within:outline-themeBlue  focus:outline-2"
          placeholder="Untitled fiddle"
        />
        <input
          type="text"
          required
          className="h-14 w-full    rounded border-b-themeBlue  bg-baseBgDarker   px-2 text-sm  text-white  outline-none placeholder:text-sm placeholder:text-textGray valid:border-b focus-within:border-0 focus-within:outline-themeBlue  focus:outline-2"
          placeholder="No Description"
          onChange={(e) => {
            setDescripton(e.target.value || 'No Description')
          }}
        />
        <button
          ref={buttonRef}
          onMouseMove={(e) => {
            setMousePosition({
              x: e.pageX - buttonRef.current.offsetLeft,
              y: e.pageY - buttonRef.current.offsetTop,
              hovered: true,
            })
          }}
          onMouseLeave={(e) => {
            setMousePosition({
              hovered: false,
            })
          }}
          className={`relative z-[0]  mt-auto flex h-12 w-full items-center justify-center  overflow-hidden  rounded-md text-white outline-2  outline-themeBlue`}
        >
          Save
          <div
          onClick={downloadFiles}
            style={{
              left: mousePositon.x,
              top: mousePositon.y,
              width: mousePositon.hovered ? '100%' : '0',
              height: mousePositon.hovered ? '100%' : '0',
            }}
            className={` absolute  z-[-1] h-0 w-0 -translate-y-1/2 -translate-x-1/2  rounded-full bg-blue-500  transition-all  `}
          ></div>
        </button>
      </div>
      <div className="h-36  border-t-2 border-themeYellow p-4">
        <p className="mb-3 text-sm font-semibold text-white">
          Support the development of JSFiddle and get extra features ✌🏻
        </p>
        <Link href={'/extra'}>
          <a className="w-[80 %] flex h-8  items-center justify-center rounded bg-themeYellow px-2  text-sm">
            Become a supporter
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
