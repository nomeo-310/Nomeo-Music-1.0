'use client'

import { UserContextProvider } from '@/hooks/useUser'
import React from 'react'

type userProviderProps = {
  children: React.ReactNode
}

const UserProvider = ({children}: userProviderProps) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default UserProvider