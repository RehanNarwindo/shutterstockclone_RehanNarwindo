// "use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CardProduct from "@/components/CardProduct";
import { ObjectId } from "mongodb";
import Image from "next/image";

const dataBanner = [
  {
    id: 1,
    imgUrl: "https://cdn.wallpapersafari.com/65/0/uvD10f.jpg",
  },
  {
    id: 2,
    imgUrl: "https://w.wallha.com/ws/13/TWpo3FCL.jpg",
  },
  {
    id: 3,
    imgUrl:
      "https://i.pinimg.com/originals/0e/e7/72/0ee77203a222b74929b7f7c028250f08.jpg",
  },
  {
    id: 4,
    imgUrl:
      "https://images.wallpaperscraft.com/image/single/street_sunset_palm_trees_122106_1920x1080.jpg",
  },
  {
    id: 5,
    imgUrl:
      "https://wallpapers.com/images/hd/borobudur-temple-under-orange-sky-0ylwarjmvs60s2pn.jpg",
  },
];

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

const Home = async () => {
  const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const respons = await fetch(link + "/api/product?limit=10");
  const { data }: { data: ProductType[] } = await respons.json();
  // console.log(data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="overflow-x-auto w-full snap-x snap-mandatory scroll-smooth">
        <div className="flex">
          {dataBanner.map((el) => (
            <div key={el.id} className="flex-shrink-0 w-screen snap-start">
              <img
                src={el.imgUrl}
                alt={`Banner Image ${el.id}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-8 m-2">
        <h1 className="text-4xl font-bold m-10">
          Selamat Datang di Shutterstock
        </h1>
        <p className="text-sm mb-8">
          Temukan inspirasi visual Anda di Shutterstock, platform terkemuka
          untuk gambar berkualitas tinggi, video, dan musik. Jelajahi koleksi
          kami yang luas dengan jutaan aset kreatif yang siap digunakan dalam
          proyek Anda. Dari foto-foto menakjubkan hingga video yang mengesankan,
          Shutterstock menawarkan sumber daya yang Anda butuhkan untuk membuat
          konten yang memikat. Bergabunglah dengan komunitas kreatif kami dan
          temukan elemen visual yang akan menghidupkan ide-ide Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {data.slice(0, 8).map((el, idx) => {
          return <CardProduct key={idx} showButton={false} product={el} />;
        })}
      </div>

      <div className="text-center mt-8 mb-8">
        <Link
          href="/product"
          className="px-3 py-2 bg-red-600 rounded-md text-white font-bold mb-4"
        >
          See all products...
        </Link>
      </div>
    </div>
  );
};

export default Home;
