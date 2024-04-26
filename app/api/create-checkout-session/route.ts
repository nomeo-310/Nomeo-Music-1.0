import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/libs/stripe'
import { fetchUrl } from '@/libs/helpers'
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin'


export const POST = async (request:Request) => {
  const { price, quantity = 1, metadata = {}} = await request.json();

  try {
    const supabase = createRouteHandlerClient({cookies, });
    const { data: {user}} = await supabase.auth.getUser();

    const userData = {uuid: user?.id || '', email: user?.email || ''}
    const customer  = await createOrRetrieveCustomer(userData)

    const sessionData = {
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer, 
      line_items: [{
        price: price?.id,
        quantity
      }],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata
      },
      success_url: `${fetchUrl()}/account`,
      cancel_url: `${fetchUrl()}`
    }
    //@ts-ignore
    const session = await stripe.checkout.sessions.create(sessionData)

    return NextResponse.json({sessionId: session?.id})

  } catch (error:any) {
    console.log(error);
    return new NextResponse('Internal server error', {status: 500})
  }
}