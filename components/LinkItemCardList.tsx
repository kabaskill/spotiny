import Image from "next/image";
import Link from "next/link";

export default function LinkItemCardList({ items, listTitle }: any) {
  return (
    <>
      <div className="my-4">
        <h2 className="self-start text-2xl">{listTitle}</h2>
        <ul className="max-w-full flex flex-wrap gap-4">
          {items.map((item: any) => (
            <li key={item.id}>
              <LinkItemCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function LinkItemCard({ item }: any) {
  return (
    <Link href={item.href} className="flex flex-col w-[200px] border-gray-400 border-2 p-4 ">
      <Image
        src={item.images[0].url}
        alt={item.name}
        width={item.images[0].width ? item.images[0].width : 640}
        height={item.images[0].height ? item.images[0].height : 640}
        className="aspect-square object-cover"
      />
      <p className="mt-4 truncate text-ellipsis max-w-full">{item.name}</p>
    </Link>
  );
}
