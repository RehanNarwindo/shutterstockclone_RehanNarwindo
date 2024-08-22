"use client";
import Link from "next/link";
import ButtonRemoveWishlist from "./ButtonRemoveWishlist";
import { ProductType } from "@/app/(withNavbar)/page";
import { ObjectId } from "mongodb";
import Image from "next/image";

interface CardWishlistProps {
  product: ProductType;
  wishlistId: ObjectId;
}

const CardWishlist: React.FC<CardWishlistProps> = ({
  product,
  wishlistId,
}: CardWishlistProps) => {
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg group">
      {/* <Link href={`/product/${product.slug}`} passHref> */}
      <img
        className="w-full h-64 object-cover"
        src={product.thumbnail}
        alt="Product Image"
      />
      {/* </Link> */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-4 flex justify-center z-20">
        <ButtonRemoveWishlist id={wishlistId} />
      </div>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white z-10">
        <p>{product.name}</p>
      </div>
    </div>
  );
};

export default CardWishlist;
