'use server'

import { song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { fetchSongs } from "./fetchSongs";

export const fetchSongsByTitle = async (title:string):Promise<song[]> => {

  const supabase = createServerComponentClient({cookies: cookies});

  const { data:sessionData, error:sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message)
    return [];
  };

  if (!title) {
    const allsongs = await fetchSongs();
    return allsongs;
  }

  const { data, error } = await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', {ascending: false});

  if (error) {
    console.log(error)
  }

  return (data as any) || []

}