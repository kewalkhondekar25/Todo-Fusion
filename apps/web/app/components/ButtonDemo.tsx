"use client"
import React from 'react'

interface ButtonProps {
  children: React.ReactNode,
  className?: string
}

const ButtonDemo = ({children}: ButtonProps) => {
  return (
    <button
      onClick={() => alert("clicked from button ui")}>
      {children}
    </button>
  )
}

export default ButtonDemo