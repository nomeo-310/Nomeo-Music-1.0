import React from 'react'
import { twMerge } from 'tailwind-merge'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, inputProps>(({className, type, disabled, ...props}, ref) => {
  return <input type={type} className={twMerge('flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none', className)} disabled={disabled} {...props} ref={ref}/>
})

Input.displayName = 'Input';

export default Input;


