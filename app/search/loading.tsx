'use client'

import React from 'react'
import Box from '@/components/Box'
import { BounceLoader } from 'react-spinners'


const Loading = () => {
  return (
    <Box className='h-full flex items-center justify-center'>
      <BounceLoader color='#60a5fa' size={80}/>
    </Box>
  )
}

export default Loading