"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import CardProduct from "@/components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { ObjectId } from "mongodb";

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

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async (pages: number, searchInput: string) => {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    let url = link + `/api/product?page=${pages}`;
    if (searchInput) {
      url = link + `/api/product?name=${searchInput}&page=${pages}`;
    }
    const res = await fetch(url);
    const { data }: { data: ProductType[] } = await res.json();

    if (pages === 1) {
      setProducts(data);
    } else {
      setProducts((prev) => [...prev, ...data]);
    }

    if (data.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    getProducts(1, query);
  }, [query]);

  const fetchMoreProducts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getProducts(nextPage, query);
  };

  return (
    <>
      <div className="text-center mb-8 mt-10"></div>
      <div className="flex flex-col items-center mb-8 mt-10">
        <input
          type="text"
          placeholder="Cari produk..."
          className="input w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<h4>No more products</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 mt-10 mb-10">
          {products.length > 0 ? (
            products.map((el, idx) => (
              <CardProduct showButton={true} key={idx} product={el} />
            ))
          ) : (
            <p> ..... </p>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Product;
