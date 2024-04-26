import React from 'react'
import { song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';

const useFetchSongsById = (id?:string) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [song, setSong] = React.useState<song | undefined>(undefined);

  const { supabaseClient } = useSessionContext();

  const fetchSong = React.useCallback(async() => {
    const { data, error } = await supabaseClient.from('songs').select('*').eq('id',id).single()

    if (error) {
      setIsLoading(false)
      return toast.error(error.message)
    }

    setSong(data as song);
    setIsLoading(false);
  }, [id, supabaseClient]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    fetchSong();
  }, [fetchSong, id]);

  return React.useMemo(()=> ({isLoading, song}), [isLoading, song]);
}

export default useFetchSongsById;