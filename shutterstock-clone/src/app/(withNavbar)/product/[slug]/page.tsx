import ButtonAddWishlist from "@/components/ButtonAddWishlist";
import ButtonRemoveWishlist from "@/components/ButtonRemoveWishlist";
import { ObjectId } from "mongodb";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

export interface ProductType {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  except: string;
  price: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface DetailProductProps {
  params: {
    slug: string;
  };
}
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  // console.log("slug", slug);
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const { product }: { product: ProductType } = await fetch(
    link + `/api/product/${slug}`
  ).then((res) => res.json());
  // console.log("ini product ", product);

  const previousImages = (await parent).openGraph?.images || [];
  // console.log("namanya ", product.name);

  return {
    title: product.name,
    openGraph: {
      images: [product.thumbnail, ...previousImages],
    },
  };
}

const Detail: React.FC<DetailProductProps> = async ({ params }) => {
  const { slug } = params;
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(link + `/api/product/${slug}`, {
    method: "GET",
    cache: "no-store",
  });

  const { product }: { product: ProductType } = await response.json();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
          <div className="w-4/6">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-2/6 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-gray-500">${product.price}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="ml-4 text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-600 last:mr-0 mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <ButtonAddWishlist id={product._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
