'use client'

import React from 'react'
import { useLoadImage } from '@/hooks/useLoadImage';
import { HiPlay } from "react-icons/hi2"
import { song } from '@/types'
import Image from 'next/image'
import Button from '@/components/Button';
import PlayButton from './PlayButton';

type songItemProps = {
  song: song
  onClick: (id:string) => void
}

const SongItem = ({song, onClick}: songItemProps) => {
  const imagePath = useLoadImage(song);

  return (
    <div>
      <div onClick={() => onClick(song.id)} className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-y-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition'>
        <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
          <Image src={imagePath as string || '/images/playlist.jpg'} alt='album_art' fill />
        </div>
        <div className='absolute right-5 bottom-5'>
          <PlayButton/>
        </div>
      </div>
      <div className='flex flex-col items-start pt-4 gap-y-1'>
        <p className="line-clamp-1 w-full font-semibold">{song.title}</p>
        <p className="text-sm text-neutral-400 w-full pb-3">By {song.author}</p>
      </div>
    </div>
  )
}

export default SongItem