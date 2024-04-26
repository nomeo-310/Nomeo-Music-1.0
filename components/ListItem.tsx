'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { HiPlay } from "react-icons/hi2"

type listItemProps = {
  image:string
  name:string
  href:string
}

const ListItem = ({image, name, href}: listItemProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(href)
  }
  return (
    <button className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 pr-4 transition' onClick={handleOnClick}>
      <div className="relative min-h-[80px] min-w-[80px]">
        <Image src={image} alt='playlist_banner' className='object-cover' fill />
      </div>
      <p className='font-medium truncate'>{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-blue-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <HiPlay className='text-black' size={20} />
      </div>
    </button>
  ) 
}

export default ListItem