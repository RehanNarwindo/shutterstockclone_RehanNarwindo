"use client";
import Link from "next/link";
import ButtonAddWishlist from "./ButtonAddWishlist";
import { ProductType } from "@/app/(withNavbar)/page";
import Image from "next/image";

interface CardProductProps {
  product: ProductType;
  showButton: boolean;
}
const CardProduct: React.FC<CardProductProps> = ({
  product,
  showButton,
}: CardProductProps) => {
  return (
    <>
      <div className="relative max-w-sm rounded overflow-hidden shadow-lg group">
        <Link href={`/product/${product.slug}`} passHref>
          <img
            className="w-full h-64 object-cover"
            src={product.thumbnail}
            alt="Product Image"
          />
          {showButton && (
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-4 flex justify-center z-10">
              <ButtonAddWishlist id={product._id} />
            </div>
          )}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white z-0">
            <p>{product.name}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardProduct;
