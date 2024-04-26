'use client'


import React from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import qs from 'query-string';
import Input from './Input';

type Props = {}

const SearchInput = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(() => {
    const query = {title: debouncedValue}
    const url = qs.stringifyUrl({url: '/search', query: query});

    router.push(url);
  }, [debouncedValue, router])

  return (
    <Input 
      placeholder='What do you want to listen to ?'
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
    />
  )
}

export default SearchInput;