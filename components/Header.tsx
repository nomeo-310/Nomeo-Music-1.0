'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiOutlineHome, HiOutlineMagnifyingGlass } from "react-icons/hi2"
import { twMerge } from 'tailwind-merge';
import Button from './Button';

type headerProps = {
  children:React.ReactNode
  className?:string
}

const Header = ({children, className}: headerProps) => {
  const router = useRouter();
  const handleLogOut = () => {

  };

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from from-blue-600 p-6', className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-3 items-center">
          <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition' onClick={() => router.back()}>
            <RxCaretLeft size={35} className='text-white'/>
          </button>
          <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition' onClick={() => router.forward()}>
            <RxCaretRight size={35} className='text-white'/>
          </button>
        </div>
        <div className="flex md:hidden gap-x-3 items-center">
          <button className='p-2 rounded-full bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiOutlineHome className='text-black' size={22}/>
          </button>
          <button className='p-2 rounded-full bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiOutlineMagnifyingGlass className='text-black' size={22}/>
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <React.Fragment>
            <div>
              <Button className='bg-transparent text-neutral-300 font-medium' onClick={() => {}}>Sign up</Button>
            </div>
            <div>
              <Button className='bg-white px-6 py-2' onClick={() => {}}>Log in</Button>
            </div>
          </React.Fragment>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header