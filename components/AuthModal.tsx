'use client'


import React from 'react'
import Modal from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuthModal } from '@/hooks/useAuthModal'


const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open:boolean) => {
    if (!open) {
      onClose();
    }
  }

  React.useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [onClose, router, session])

  return (
    <Modal title='Welcome back' description='Login to your account' isOpen={isOpen} onChange={onChange}>
      <Auth
        theme='dark'
        providers={['google']}
        magicLink
        supabaseClient={supabaseClient} 
        appearance={{theme: ThemeSupa, 
          variables: {
            default: {
              colors: {
                brand: '#3b82f6',
                brandAccent: '#60a5fa'
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default AuthModal