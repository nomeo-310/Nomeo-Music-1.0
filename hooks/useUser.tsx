import React from 'react'
import { User } from '@supabase/auth-helpers-nextjs'
import { subscription, userDetails } from '@/types'
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react'

type userContextType = {
  accessToken: string | null
  user: User | null
  userDetails: userDetails | null
  isLoading: boolean
  subscription: subscription | null
}

export interface Props {
  [propName: string]: any
}

const UserContext = React.createContext<userContextType | undefined>(undefined);

export const UserContextProvider = (props: Props) => {
  const { session, isLoading:isLoadingUser, supabaseClient:supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<userDetails | null>(null);
  const [subscription, setSubscription] = React.useState<subscription | null>(null);

  const fetchUserDetails = () => supabase.from('users').select('*').single();
  const fetchSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single();

  React.useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([fetchUserDetails(), fetchSubscription()])
      .then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === 'fulfilled') {
          setUserDetails(userDetailsPromise.value.data as userDetails)
        }

        if (subscriptionPromise.status === 'fulfilled') {
          setSubscription(subscriptionPromise.value.data as subscription)
        }
        setIsLoadingData(false);
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingData, user]);

  const value = { accessToken, user, userDetails, isLoading: isLoadingUser || isLoadingData, subscription };

  return (
    <UserContext.Provider value={value} {...props}/>
  )
};

export const useUser = () => {
  const context = React.useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within the UserContextProvider')
  }

  return context
}
