'use client'

import React from 'react'
import { song } from '@/types'
import { useLoadImage } from '@/hooks/useLoadImage'
import Image from 'next/image'

type mediaItemProps = {
  data: song
  onClick?: (id:string) => void
}

const MediaItem = ({data, onClick}: mediaItemProps) => {
  const {id, title, author } = data;
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(id)
    }
  }
  return (
    <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md '>
      <div className="relative rounded-md overflow-hidden min-h-12 min-w-12">
        <Image src={imageUrl as string || '/images/playlist.jpg'} alt='album_art' fill/>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white line-clamp-1">{title}</p>
        <p className="text-neutral-400 line-clamp-1 text-sm">{author}</p>
      </div>
    </div>
  )
}

export default MediaItem;