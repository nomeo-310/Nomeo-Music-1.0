import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/libs/stripe'
import { fetchUrl } from '@/libs/helpers'
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin'

export const POST = async (request:Request) => {

  try {
    const supabase = createRouteHandlerClient({cookies, });
    const { data: {user}} = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Could not user')
    }

    const userData = {uuid: user?.id || '', email: user?.email || ''}
    const customer  = await createOrRetrieveCustomer(userData)

    if (!customer) {
      throw new Error('Could get customer')
    }

    const billingData = {
      customer,
      return_url: `${fetchUrl}/account`
    }

    //@ts-ignore
    const { url } = await stripe.billingPortal.sessions.create(billingData)

    return NextResponse.json({url})

  } catch (error:any) {
    console.log(error);
    return new NextResponse('Internal server error', {status: 500})
  }
}