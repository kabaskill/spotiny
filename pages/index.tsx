"use client";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import ResultsSection from "@/components/ResultsSection";
import MusicPlayer from "@/components/MusicPlayer";
import LeftPane from "@/components/LeftPane";
import UseSpotify from "@/hooks/useSpotify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>({});

  const [playlist, setPlaylist] = useState<Array<any>>([]);

  const spotifyApi = UseSpotify();

  useEffect(() => {
    spotifyApi.getUserPlaylists({ limit: 50 }).then((res) => {
      setPlaylist(res.body.items);
    });

    console.log("hele:", playlist);
  }, []);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      spotifyApi.search(debouncedQuery, ["track", "album", "artist", "playlist"]).then((res) => {
        setSearchResults(res.body);
      });
    }

    console.log(searchResults);
  }, [debouncedQuery]);

  return (
    <>
      <div className=" h-screen grid grid-cols-[10%_65%_25%] relative">
        
        <LeftPane />

        <main
          className={`pt-8 px-8 ${inter.className} bg-appbackground overflow-auto w-full sticky flex flex-col justify-center items-center`}
        >
          <input
            type="text"
            className=" w-1/2 bg-slate-500 mb-8 p-2"
            name="SpotifySearch"
            placeholder="Search on Spotify"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          <ResultsSection data={searchResults} />

        </main>

        <aside className="overflow-auto sticky">

          <MusicPlayer tracklist={searchResults.tracks?.items} />

        </aside>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
