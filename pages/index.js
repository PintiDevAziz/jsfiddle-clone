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
  return (
    <div className="h-screen w-full bg-baseBg">
      <Header />
      <div className=" flex h-[calc(100vh-4rem)] w-full">
        <Sidebar />
        <div className=" grid w-full grid-cols-2 grid-rows-2 overflow-hidden   ">
          <div className="h-full ">
            <CodeMirror
              height="350px"
              theme={oneDark}
              extensions={[html()]}
              onChange={(value, viewUpdate) => {
                setHtmlVal(value)
              }}
            />
          </div>
          <div className="h-full">
            <CodeMirror
              height="350px"
              theme={oneDark}
              extensions={[css()]}
              onChange={(value, viewUpdate) => {
                setCssVal(value)
              }}
            />
          </div>
          <div className="h-full">
            <CodeMirror
              height="350px"
              theme={oneDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                setJsVal(value)
              }}
            />
          </div>
          <div className="h-[350px] ">
            <iframe
              srcDoc={`<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                  ${cssVal}
                  </style>
              </head>
              <body>
                  ${htmlVal}

                  <script>
                  ${jsVal}
                  </script>
              </body>
              </html>`}
              className="h-full w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
