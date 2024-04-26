'use client'


import React from 'react'
import Modal from './Modal'
import { price, productWithPrice } from '@/types'
import Button from './Button'
import { useUser } from '@/hooks/useUser'
import { toast } from 'sonner'
import { postData } from '@/libs/helpers'
import { fetchStripe } from '@/libs/stripeClient'

type subscriptionModalProps = {
  subscriptions: productWithPrice[];
}

const formatPrice = (price:price) => {
  const priceString = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0)/100)

  return priceString;
}

const SubscriptionModal = ({subscriptions}: subscriptionModalProps) => {
  const [priceIdLoading, setPriceIdLoading] = React.useState<string>();

  const { user, isLoading, subscription } = useUser();

  const handleCheckOut = async(price:price) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error('You must be logged in')
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('Already subscribed')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: price
      });

      const stripe = await fetchStripe();
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }

  }

  let content = (
    <div className="text-center">
      No product avaiable.
    </div>
  )

  if (subscriptions.length) {
    content = (
      <div className="">
        {subscriptions.map((subscription) => {
          if (!subscription.prices?.length) {
            return ( 
              <div key={subscription.id}>
                No prices available
              </div>
            )
          }

          return subscription.prices.map((price) => (
            <Button 
              key={price.id}
              onClick={() => handleCheckOut(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className='mb-4'
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className="text-center">
        Already subscribed.
      </div>
    )
  }

  return (
    <Modal
      title='For Premium Subscription'
      description='Listen to Nomeo Music with premium subscription'
      isOpen
      onChange={() => {}}
    >
      {content}
    </Modal>
  )
}

export default SubscriptionModal