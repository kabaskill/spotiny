import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  data: SpotifyApi.SearchResponse;
}

interface CardListProps<T> {
  dataKey: SpotifyApi.PagingObject<T> | undefined;
  listTitle: string;
}

export default function SearchResults({ data }: SearchResultsProps) {
  return (
    <>
      <TrackList<SpotifyApi.TrackObjectFull> listTitle="Tracks" dataKey={data.tracks} />

      {/* <CardList<SpotifyApi.ArtistObjectFull> listTitle="Artist" dataKey={data.artists} />
      <CardList<SpotifyApi.AlbumObjectSimplified> listTitle="Albums" dataKey={data.albums} />
      <CardList<SpotifyApi.PlaylistObjectSimplified>
        listTitle="Playlists"
        dataKey={data.playlists}
      /> */}
    </>
  );
}

function CardList<T>({ dataKey, listTitle }: CardListProps<T>) {
  return (
    <>
      <div className="my-4">
        <h2 className="self-start text-2xl">{listTitle}</h2>
        <ul className="max-w-full flex flex-wrap gap-4">
          {dataKey?.items.map((item: T) => (
            <li key={(item as any).id}>
              <Link
                href={(item as any).href}
                className="flex flex-col w-[200px] border-gray-600 border-2 p-4 "
              >
                <Image
                  src={(item as any).images[0].url}
                  alt={(item as any).name}
                  width={(item as any).images[0].width ? (item as any).images[0].width : 640}
                  height={(item as any).images[0].height ? (item as any).images[0].height : 640}
                  className="aspect-square object-cover"
                />
                <p className="mt-4 truncate text-ellipsis max-w-full">{(item as any).name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function TrackList<T>({ dataKey, listTitle }: CardListProps<T>) {
  return (
    <>
      <div className="my-4">
        <h2 className="self-start text-2xl">{listTitle}</h2>
        <ul className="max-w-full flex-col">
          {dataKey?.items.map((item: T) => (
            <li key={(item as any).id}>
              <Link
                href={(item as any).href}
                className="w-[200px] border-gray-600 "
              >
                <p className="mt-4 truncate text-ellipsis max-w-full">{(item as any).name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
