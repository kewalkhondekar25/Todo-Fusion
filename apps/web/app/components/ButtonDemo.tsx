"use client"
import React from 'react'
import { useAppDispatch } from '../../lib/store/hooks/hooks'
import { Action, PayloadAction } from '@reduxjs/toolkit';

interface ButtonProps {
  children: React.ReactNode,
  className?: string,
  onClick: () => Action | PayloadAction<any>
}

const ButtonDemo = ({children, onClick}: ButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(onClick())}>
      {children}
    </button>
  )
}

export default ButtonDemo