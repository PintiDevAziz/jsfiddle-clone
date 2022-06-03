import React from 'react'

const Input = ({value,setValue,placeholder,type}) => {
  return (
    <label className="group relative flex h-[4.5rem] w-full items-center border-b  border-[#313438] bg-[#1F2227] px-4 ">
      <span
        className={`absolute text-sm ${
          value ? '-translate-y-5 -translate-x-1 text-sm opacity-75' : null
        }   text-textGray transition-all group-focus-within:-translate-x-1  group-focus-within:-translate-y-5 group-focus-within:text-sm  group-focus-within:opacity-75`}
      >
        {placeholder}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        className="h-full w-full bg-transparent text-white  outline-none "
      />
    </label>
  )
}

export default Input
