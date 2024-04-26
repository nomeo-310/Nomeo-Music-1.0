"use client";

import React from "react";
import { song } from "@/types";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

type pageContentProps = {
  songs: song[];
};

const PageContent = ({ songs }: pageContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs?.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      { songs?.map((song:song) => (
        <SongItem song={song} key={song.id} onClick={(id:string) => onPlay(id)}/>
      ))}
    </div>
  );
};

export default PageContent;

