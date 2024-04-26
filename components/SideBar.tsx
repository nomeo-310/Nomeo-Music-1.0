'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { HiOutlineHome, HiOutlineMagnifyingGlass } from "react-icons/hi2"
import Box from './Box'
import SideBarItem, { sidebarItemProps } from './SideBarItem'
import Library from './Library'
import { song } from '@/types'
import { usePlayer } from '@/hooks/usePlayer'
import { twMerge } from 'tailwind-merge'

type sidebarProps = {
  children: React.ReactNode
  userSongs: song[];
}

const SideBar = ({children, userSongs}: sidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

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
      href: '/search',
      icon: HiOutlineMagnifyingGlass
    }
  ], [pathname]);

  return (
    <div className={twMerge('flex h-full', player.activeId && 'h-[calc(100%-80px)]')}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4 rounded'>
            {routes.map((item:sidebarItemProps, index:number) => (
              <SideBarItem key={index} {...item}/>
            ))}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library userSongs={userSongs}/>
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto md:py-2 md:px-0 p-2'>
        {children}
      </main>
    </div>
  )
}

export default SideBar;