import Link from "next/link";

type Props = {
  name: string;
  price: string;
  image: string;
  slug: string;
};

export default function ProductCardItem({
  name,
  price,
  image,
  slug,
}: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover sm:h-48"
      />

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {name}
        </h3>

        <p className="mt-2 font-bold text-[#b11226]">{price}</p>

        <div className="mt-3">
          <span className="inline-flex w-full items-center justify-center rounded-xl bg-[#b11226] px-3 py-2 text-xs font-semibold text-white">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}