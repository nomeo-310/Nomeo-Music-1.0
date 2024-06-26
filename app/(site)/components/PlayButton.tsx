import React from 'react'
import { HiPlay } from 'react-icons/hi2'

type Props = {}

const PlayButton = (props: Props) => {
  return (
    <button className='transition opacity-0 rounded-full flex items-center bg-blue-500 p-3 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
      <HiPlay size={24} className='text-neutral-900'/>
    </button>
  )
}

export default PlayButton