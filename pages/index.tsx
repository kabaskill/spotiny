"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import ResultsSection from "@/components/ResultsSection";
import MusicPlayer from "@/components/MusicPlayer";
import LeftPane from "@/components/LeftPane";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const session = useSession();

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSWR<SpotifyApi.SearchResponse>(debouncedQuery.length > 2 ? `/api/search?query=${debouncedQuery}` : null);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  return (
    <>
      <div className=" h-screen grid grid-cols-[10%_65%_25%] relative">
        <LeftPane />

        <main
          className={`pt-8 px-8 ${inter.className} bg-appbackground overflow-auto w-full sticky flex flex-col justify-center items-center`}
        >
          <input
            type="text"
            className=" w-1/2 bg-slate-500"
            name="SpotifySearch"
            placeholder="Search on Spotify"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          
          {error && <div> ERROR </div>}

          {searchResults && !isLoading && (
            <>
              <ResultsSection data={searchResults} />
            </>
          )}
        </main>

        <aside className="overflow-auto sticky">
          <MusicPlayer data={searchResults ? searchResults.tracks?.items : []} />
        </aside>
      </div>
    </>
  );
}
