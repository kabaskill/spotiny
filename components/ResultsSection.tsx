import Image from "next/image";
import Link from "next/link";
import { Tabs } from "./ui/tabs";

interface SearchResultsProps {
  data: SpotifyApi.SearchResponse;
}

interface CardListProps<T> {
  dataKey: SpotifyApi.PagingObject<T> | undefined;
  listTitle: string;
}

export default function ResultsSection({ data }: SearchResultsProps) {
  const tabs = [
    {
      title: "Tracks",
      value: "track",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TrackList<SpotifyApi.TrackObjectFull> listTitle="Tracks" dataKey={data.tracks} />
        </div>
      ),
    },
    {
      title: "Artists",
      value: "artists",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <CardList<SpotifyApi.ArtistObjectFull> listTitle="Artists" dataKey={data.artists} />
        </div>
      ),
    },
    {
      title: "Albums",
      value: "albums",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <CardList<SpotifyApi.AlbumObjectSimplified> listTitle="Albums" dataKey={data.albums} />
        </div>
      ),
    },
    {
      title: "Playlists",
      value: "playlists",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <CardList<SpotifyApi.PlaylistObjectSimplified>
            listTitle="Playlists"
            dataKey={data.playlists}
          />
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}

function CardList<T>({ dataKey, listTitle }: CardListProps<T>) {
  return (
    <>
      <h3 >{listTitle}</h3>
      <ul className="max-w-full h-full  gap-2 overflow-auto">
        {dataKey?.items.map((item: T) => (
          <li key={(item as any).id}>
            <Link href={(item as any).href} className="flex flex-col p-4 ">
              {/* <Image
                src={(item as any).images[0].url ? (item as any).images[0].url : ""}
                alt={(item as any).name}
                width={256}
                height={256}
                className="aspect-square object-cover"
              /> */}
              <p className="mt-4 truncate text-ellipsis">{(item as any).name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function TrackList<T>({ dataKey, listTitle }: CardListProps<T>) {
  return (
    <>
      <h3 >{listTitle}</h3>
      <ul className="max-w-full flex-col">
        {dataKey?.items.map((item: T) => (
          <li key={(item as any).id}>
            <Link href={(item as any).href} className="w-[200px] border-gray-600 ">
              <p className="mt-4 truncate text-ellipsis max-w-full">{(item as any).name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
