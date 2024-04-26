'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiOutlineHome, HiOutlineMagnifyingGlass, HiUser } from "react-icons/hi2"
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

type headerProps = {
  children:React.ReactNode
  className?:string
}

const Header = ({children, className}: headerProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogOut = async() => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out')
    }
    
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
          <button className='p-2 rounded-full bg-white flex items-center justify-center hover:opacity-75 transition' onClick={() => router.push('/')}>
            <HiOutlineHome className='text-black' size={22}/>
          </button>
          <button className='p-2 rounded-full bg-white flex items-center justify-center hover:opacity-75 transition' onClick={() => router.push('/search')}>
            <HiOutlineMagnifyingGlass className='text-black' size={22}/>
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          { user ? 
            (<React.Fragment>
              <div>
                <Button className='bg-white px-6 py-2' onClick={handleLogOut}>Log out</Button>
              </div>
              <div>
                <Button className='bg-white p-2 ' onClick={() => router.push('/account')}>
                  <HiUser size={22}/>
                </Button>
              </div>
            </React.Fragment>) : 
            (<React.Fragment>
              <div>
                <Button className='bg-transparent text-neutral-300 font-medium' onClick={onOpen}>Sign up</Button>
              </div>
              <div>
                <Button className='bg-white px-6 py-2' onClick={onOpen}>Log in</Button>
              </div>
            </React.Fragment>)
          }
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header