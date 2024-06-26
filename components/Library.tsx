'use client'

import React from 'react'
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from '@/hooks/useUser';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUploadModal } from '@/hooks/useUploadModal';
import { song } from "@/types";
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

const Library = ({userSongs}:{userSongs: song[]}) => {
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const onPlay = useOnPlay(userSongs);

  const handleOnClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-between px-5 pt-4 ">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className='text-neutral-400'/>
          <p className='text-neutral-400 font-medium'>Your Library</p>
        </div>
        <AiOutlinePlus size={22} onClick={handleOnClick} className='text-neutral-400 cursor-pointer hover:text-white transition'/>
      </div>
      <div className="flex flex-col px-3 gap-y-2 mt-4">
        {userSongs && userSongs.length > 0 && userSongs.map((song:song) => (
          <MediaItem data={song} key={song.id} onClick={(id:string) => onPlay(id)}/>
        ))}
      </div>
    </div>
  )
}

export default Library