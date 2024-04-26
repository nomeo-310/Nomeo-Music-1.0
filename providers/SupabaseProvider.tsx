'use client'

import React from 'react'
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"


type supabaseProviderProps = {
  children: React.ReactNode
}

const SupabaseProvider = ({children}: supabaseProviderProps) => {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const [supabaseClient] = React.useState(() => 
    createClientComponentClient<Database>({supabaseUrl, supabaseKey}))

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;