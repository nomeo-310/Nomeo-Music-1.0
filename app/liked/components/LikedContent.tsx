'use client'

import React from 'react'
import { song } from '@/types'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import MediaItem from '@/components/MediaItem'
import LikeButton from '@/components/LikeButton'
import useOnPlay from '@/hooks/useOnPlay'

type likedConentProps = {
  songs: song[]
}

const LikedContent = ({songs}: likedConentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return (
      <div className="gap-y-2 w-full text-neutral-400 flex flex-col px-6">
        No liked songs
      </div>
    )
  }

  return (
    <div className="gap-y-2 w-full flex flex-col p-6">
      {songs && songs.map((song:song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem data={song} onClick={(id:string) => onPlay(id)}/>
          </div>
          <LikeButton songId={song.id}/>
        </div>
      ))}
    </div>
  )
}

export default LikedContent;