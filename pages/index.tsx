import { useState, useEffect } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import SearchResults from "@/components/SearchResults";
import MusicPlayer from "@/components/MusicPlayer";

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

  return (
    <>
      <main className={`bg-red-300 flex flex-col items-center justify-start pt-8 px-24 ${inter.className}`}>
        {session.status === "authenticated" && (
          <pre className="max-w-[600px]">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        )}

        <input
          type="text"
          className=" w-3/4 bg-slate-500"
          name="SpotifySearch"
          placeholder="Search on Spotify"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />

        {error && <div> ERROR </div>}

        {searchResults && !isLoading && <SearchResults data={searchResults} />}
      </main>

      <aside className="h-screen">
        {searchResults && !isLoading && <MusicPlayer data={searchResults.tracks.items} />}
      </aside>
    </>
  );
}
