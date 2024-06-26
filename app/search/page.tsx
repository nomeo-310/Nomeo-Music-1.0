import { fetchSongsByTitle } from '@/actions/fetchSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import React from 'react'
import SearchContent from './components/SearchContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nomeo Music 1.0 | Search",
  description: "A music app generated by create next app, it enables you to stream music online.",
};

type searchPageProps = {
  searchParams: {title: string}
}

export const revalidate = 0;

const searchPage = async ({searchParams}: searchPageProps) => {

  const songs = await fetchSongsByTitle(searchParams.title);

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-neutral-900'>
      <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput/>
        </div>
      </Header>
      <SearchContent songs={songs}/>
    </div>
  )
}

export default searchPage