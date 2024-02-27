"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import SearchResults from "@/components/SearchResults";
import MusicPlayer from "@/components/MusicPlayer";
import LeftPane from "@/components/LeftPane";
import { FadeInDiv, Tabs } from "@/components/ui/tabs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSWR(debouncedQuery.length > 2 ? `/api/search?query=${debouncedQuery}` : null);

  const session = useSession();

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Product Tab</p>
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Services tab</p>
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" h-screen grid grid-cols-[10%_60%_30%] relative">
        <LeftPane />

        <main
          className={`pt-8 px-8 ${inter.className} bg-appbackground overflow-auto w-full sticky  flex flex-col items-center`}
        >
          {session.status === "authenticated" && (
            <pre className="max-w-[600px]">
              <code>{JSON.stringify(session, null, 2)}</code>
            </pre>
          )}

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

          <Tabs
            tabs={tabs}
            containerClassName="bg-red-500 "
            activeTabClassName="bg-red-500 h-full"
            tabClassName="bg-red-500 h-full"
            contentClassName="bg-red-500 h-full "
          />

          {error && <div> ERROR </div>}

          {searchResults && !isLoading && (
            <>
              <SearchResults data={searchResults} />
            </>
          )}
        </main>

        <aside className="overflow-auto sticky">
          <MusicPlayer data={searchResults ? searchResults.tracks.items : []} />
        </aside>
      </div>
    </>
  );
}
