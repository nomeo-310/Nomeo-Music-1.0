'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { HiOutlineHome, HiOutlineMagnifyingGlass } from "react-icons/hi2"
import Box from './Box'
import SideBarItem, { sidebarItemProps } from './SideBarItem'
import Library from './Library'

type sidebarProps = {
  children: React.ReactNode
}

const SideBar = ({children}: sidebarProps) => {
  const pathname = usePathname();

  const routes = React.useMemo(() => [
    {
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
      icon: HiOutlineHome
    },
    {
      label: 'Search',
      active: pathname === '/search',
      href: '/',
      icon: HiOutlineMagnifyingGlass
    }
  ], [pathname]);

  return (
    <div className='flex h-full'>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4 rounded'>
            {routes.map((item:sidebarItemProps, index:number) => (
              <SideBarItem key={index} {...item}/>
            ))}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library/>
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto md:py-2 md:px-0 p-2'>
        {children}
      </main>
    </div>
  )
}

export default SideBar;