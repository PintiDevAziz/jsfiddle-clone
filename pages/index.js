import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'

const index = () => {
  const [user, userLoading, userError] = useAuthState(auth)
  const [htmlVal, setHtmlVal] = useState('')
  const [cssVal, setCssVal] = useState('')
  const [jsVal, setJsVal] = useState('')
  const [finalValue, setFinalValue] = useState(``)
  const [description, setDescripton] = useState('')
  const [title, setTitle] = useState('')
  const run = () => {
    setFinalValue(`<!DOCTYPE html>
      <html lang="en" style="height:100%;">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
          ${cssVal}
          </style>
      </head>
      <body style="height:100%;">
          ${htmlVal}
          <script>
          ${jsVal}
          </script>
      </body>
      </html>`)
  }
  return (
    <div className="h-screen w-full bg-baseBg">
      <Header title={title} description={description} run={run} />
      <div className=" flex h-[calc(100vh-4rem)] w-full">
        <Sidebar
          setTitle={setTitle}
          setDescripton={setDescripton}
          htmlVal={htmlVal}
          cssVal={cssVal}
          jsVal={jsVal}
        />
        <div className=" grid w-full grid-cols-2 grid-rows-2 overflow-hidden   ">
          <div className="relative   flex h-full flex-col">
            <div className=" border-r border-textGray bg-[#282C34]  p-1  font-semibold capitalize tracking-wider text-textGray">
              Html
            </div>
            <CodeMirror
              height="350px"
              className="border-b border-r border-textGray"
              theme={oneDark}
              extensions={[html()]}
              onChange={(value, viewUpdate) => {
                setHtmlVal(value)
              }}
            />
          </div>
          <div className="relative   flex h-full flex-col">
            <div className=" bg-[#282C34] p-1    font-semibold capitalize tracking-wider text-textGray">
              css
            </div>

            <CodeMirror
              height="350px"
              className="border-b border-textGray"
              theme={oneDark}
              extensions={[css()]}
              onChange={(value, viewUpdate) => {
                setCssVal(value)
              }}
            />
          </div>
          <div className=" relative   flex h-full flex-col ">
            <div className=" border-r border-t  border-textGray  bg-[#282C34] p-1  font-semibold capitalize tracking-wider text-textGray">
              JavaScript
            </div>

            <CodeMirror
              height="350px"
              className="border-r border-textGray"
              theme={oneDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                setJsVal(value)
              }}
            />
          </div>
          <div className=" relative  flex   h-[350px]  flex-col bg-[#282C34]">
            <div className=" border-t border-textGray  bg-[#282C34] p-1  font-semibold capitalize tracking-wider text-textGray">
              Browser
            </div>
            <iframe srcDoc={finalValue} className="h-full w-full"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
