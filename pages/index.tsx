import { useState } from "react";
import useSWR from "swr";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

import SearchResults from "@/components/SearchResults";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSWR(searchQuery.length > 2 ? `/api/search?query=${searchQuery}` : null);

  const session = useSession();

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
          console.log(searchResults);
        }}
      />

      {error && <div> ERROR </div>}

      {searchResults && !isLoading && (
        <>
          <SearchResults data={searchResults} />

        </>
      )}
    </main>
  );
}
