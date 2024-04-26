'use server'

import { song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

export const fetchSongs = async ():Promise<song[]> => {

  const supabase = createServerComponentClient({cookies: cookies});

  const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: false });

  if (error) {
    console.log(error)
  }

  return (data as any) || [];
}