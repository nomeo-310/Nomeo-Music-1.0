import Stripe from 'stripe';

export interface song {
  id: string
  title: string
  image_path: string
  song_path: string
  author: string
}


export interface userDetails {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface product {
  id: string
  name?: string
  active?: boolean
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface productWithPrice extends product{
  prices?: price[]
  
}

export interface price {
  id: string
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  product?: product
}

export interface subscription {
  id: string
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string
  quantity?: number
  cancel_at_perios_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  price?: price
}
