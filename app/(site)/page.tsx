import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import { fetchSongsByUserId } from "@/actions/fetchSongsByUserId";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nomeo Music 1.0 | Home",
  description: "A music app generated by create next app, it enables you to stream music online.",
};


export default async function Home() {

  const songs  = await fetchSongsByUserId();
  

  return (
    <main className="bg-neutral-900 rounded-md h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-3 ">
            <ListItem image="/images/playlist.png" name="Liked Songs" href="/liked"/>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <PageContent songs={songs}/>
      </div>
    </main>
  );
}
