'use client'

import React from 'react';
import useFetchSongsById from '@/hooks/useFetchSongsById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import { usePlayer } from '@/hooks/usePlayer';
import { song } from '@/types';
import MediaPlayerContent from './MediaPlayerContent';

type mediaPlayerProps = {}

const MediaPlayer = ({}: mediaPlayerProps) => {
  const player = usePlayer();
  const { song } = useFetchSongsById(player.activeId);
  const songUrl = useLoadSongUrl(song as song);

  if (!songUrl || !song || !player.activeId) {
    return null;
  }

  return (
    <div className='fixed bottom-0 h-[80px] bg-black w-full py-2 px-4'>
      <MediaPlayerContent song={song} songUrl={songUrl} key={songUrl}/>
    </div>
  )
}

export default MediaPlayer