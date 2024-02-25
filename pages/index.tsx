import { useState, useEffect } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import SearchResults from "@/components/SearchResults";
import  MusicPlayer  from "@/components/MusicPlayer";

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
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      {session.status === "authenticated" && (
        <pre className="max-w-[600px]">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      )}

      <input
        type="text"
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
          <MusicPlayer data={[]} />
          <SearchResults data={searchResults} />
        </>
      )}
    </main>
  );
}
