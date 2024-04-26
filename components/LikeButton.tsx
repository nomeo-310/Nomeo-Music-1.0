'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { HiOutlineHeart, HiHeart } from "react-icons/hi2"
import { toast } from 'sonner'

type likeButtonProps = {
  songId: string
}

const LikeButton = ({songId}: likeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = React.useState(false);

  const fetchData = React.useCallback(async() => {
    const { data, error } = await supabaseClient.from('liked_songs').select('*').eq('user_id', user?.id).eq('song_id', songId).single();

    if (!error && data) {
      setIsLiked(true)
    }

  }, [songId, supabaseClient, user?.id])

  React.useEffect(() => {
    if (!user?.id) {
      return;
    }
    fetchData();

  }, [fetchData, user?.id]);

  const Icon = isLiked ? HiHeart : HiOutlineHeart;

  const handleLike = async() => {
    if (!user) {
      return authModal.onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient.from('liked_songs').delete().eq('user_id', user.id).eq('song_id', songId);
      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({song_id: songId, user_id: user.id});
      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true);
        toast.success('Liked!')
      }
    }

    router.refresh();
  }

  return (
    <button className='hover:opacity-75 transition' onClick={handleLike}>
      <Icon color={isLiked ? '#3b82f6' : 'white'} size={25}/>
    </button>
  )
}

export default LikeButton;