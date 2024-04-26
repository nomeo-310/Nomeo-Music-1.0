import React from 'react'
import Modal from './Modal'
import { useUploadModal } from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';


const UploadModal = () => {
  const { isOpen, onClose} = useUploadModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const defaultUpladData = {
    author: '',
    title: '',
    song: null,
    image: null
  }

  const { register, handleSubmit, reset } = useForm<FieldValues>({defaultValues: defaultUpladData});

  const onChange = (open:boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  }

  const onSubmit:SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const audioFile = values.song?.[0];

      if (!imageFile || !audioFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`, audioFile, {cacheControl: '3600', upsert: false});

      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      const { data: imageData, error: imageError } = await supabaseClient.storage.from('images').upload(`imges-${values.title}-${uniqueId}`, imageFile, {cacheControl: '3600', upsert: false});

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      const songDetails = {
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      };

      const { error: supabaseError} = await supabaseClient.from('songs').insert(songDetails);

      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message)
      }

      router.refresh();
      setIsLoading(false);
      reset();
      onClose();
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal title='Upload a song' description='Upload an audio file' isOpen={isOpen} onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input 
          type='text' 
          disabled={isLoading} 
          placeholder='Song title...'
          id='title' 
          {...register('title', {required: true})}
        />
        <Input 
          type='text' 
          disabled={isLoading} 
          placeholder='Song author...'
          id='author' 
          {...register('author', {required: true})}
        />
        <div>
          <div className="pb-1">Select audio file</div>
          <Input 
            type='file' 
            disabled={isLoading} 
            accept='audio/*'
            id='song' 
            {...register('song', {required: true})}
          />
        </div>
        <div>
          <div className="pb-1">Select image file</div>
          <Input 
            type='file' 
            disabled={isLoading} 
            accept="image/*"
            id='image' 
            {...register('image', {required: true})}
          />
        </div>
        <Button type='submit' className='rounded-md mt-5'>Create</Button>
      </form>
    </Modal>
  )
}

export default UploadModal