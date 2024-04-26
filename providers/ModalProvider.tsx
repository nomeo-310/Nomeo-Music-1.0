'use client'

import AuthModal from '@/components/AuthModal';
import SubscriptionModal from '@/components/SubscriptionModal';
import UploadModal from '@/components/UploadModal';
import { productWithPrice } from '@/types';
import React from 'react'

type modalProviderProps = {
  subscriptions:productWithPrice[]
}

const ModalProvider = ({subscriptions}: modalProviderProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <React.Fragment>
      <AuthModal/>
      <UploadModal/>
      <SubscriptionModal subscriptions={subscriptions}/>
    </React.Fragment>
  )
}

export default ModalProvider