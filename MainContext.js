import React, { useState } from 'react'
import { createContext } from 'react'
export const MainContext = createContext()
export const MainContextProvider = ({ children }) => {
  const [html, setHtml] = useState('')
  const data = { html, setHtml }
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>
}
