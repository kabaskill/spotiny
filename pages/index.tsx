import { useState } from "react";
import useSWR from "swr";

import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResult, isLoading, error } = useSWR(`/api/search?query=${searchQuery}`);

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
        placeholder="Search on Spotify"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          console.log(searchResult);
        }}
      />

      {error && <div>Error loading data</div>}

      {searchResult && !isLoading && (
        <>
          <h2>Search Results:</h2>
          <div className="max-w-full">
            <p>ARTISTS</p>
            <ul className="max-w-full flex gap-8 flex-wrap mb-8">
              {searchResult.artists.items.map((artist: any) => (
                <li key={artist.id}>
                  <p className="text-gray-800">{artist.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-full">
            <p>ALBUMS</p>
            <ul className="max-w-full flex gap-8 flex-wrap mb-8">
              {searchResult.albums.items.map((artist: any) => (
                <li key={artist.id}>
                  <p className="text-gray-800">{artist.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-full">
            <p>PLAYLISTS</p>
            <ul className="max-w-full flex gap-8 flex-wrap mb-8">
              {searchResult.playlists.items.map((artist: any) => (
                <li key={artist.id}>
                  <p className="text-gray-800">{artist.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
