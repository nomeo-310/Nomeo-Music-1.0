import React from 'react'
import { twMerge } from 'tailwind-merge'

type boxProps = {
  children: React.ReactNode
  className?: string
}

const Box = ({children, className}: boxProps) => {
  return (
    <div className={twMerge('bg-neutral-900 h-fit w-full rounded-md', className)}>
      {children}
    </div>
  )
}

export default Box;