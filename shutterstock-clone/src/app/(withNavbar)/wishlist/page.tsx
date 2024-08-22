"use client";
import CardProduct from "@/components/CardProduct";
import CardWishlist from "@/components/CardWishlist";
import { ObjectId } from "mongodb";
import React, { useEffect, useState } from "react";

export interface WishlistType {
  _id: ObjectId;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  product: ProductType;
}

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
const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);

  async function getWishlist() {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const res = await fetch(link + "/api/wishlist", {
        method: "GET",
        cache: "no-store",
      });
      const data: { data: WishlistType[] } = await res.json();
      setWishlist(data.data);
    } catch (error) {
      console.error("error fetching wishlist:", error);
      setWishlist([]);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div className="text-center mb-8 mt-10">
        <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 mt-10 mb-10">
        {wishlist.map((el, idx) => (
          <CardWishlist key={idx} product={el.product} wishlistId={el._id} />
        ))}
      </div>
    </>
  );
};

export default Wishlist;
