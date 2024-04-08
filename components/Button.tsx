import React from 'react'
import { twMerge } from 'tailwind-merge';

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = React.forwardRef<HTMLButtonElement, buttonProps>(({className, children, type = 'button', disabled, ...props}, ref) => {
  return (
    <button type={type} className={twMerge('w-full rounded-full bg-blue-500 border border-transparent py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition', className)} disabled={disabled} ref={ref} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button;