import { ObjectId } from "mongodb";
import { z } from "zod";
import database from "../mongodb";
import { NextResponse } from "next/server";

const WishlistSchema = z.object({
  productId: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type WishlistType = {
  productId: ObjectId;
  userId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

class Wishlist {
  static collection() {
    return database.collection<WishlistType>("wishlist");
  }
  static async getAll(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];

    const wishlist = await this.collection().aggregate(agg).toArray();
    return wishlist;
  }

  static async getById(id: string) {
    const wishlist = await this.collection().findOne({
      _id: new ObjectId(id),
    });
    if (!wishlist) {
      let error = new Error("wishlist not found");
      error.name = "NotFound";
      throw error;
    }
    return wishlist;
  }
  static async create(payload: WishlistType) {
    const parseData = WishlistSchema.safeParse(payload);
    if (!parseData.success) {
      throw parseData.error;
    }
    const { productId, userId } = parseData.data;

    const existingWishlistItem = await this.collection().findOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });

    if (existingWishlistItem) {
      return "Product already in wishlist";
    }
    await this.collection().insertOne(payload);
    return "sucess add";
  }
  // static async delete(id: string) {
  //   const objectId = new ObjectId(id);
  //   // console.log(objectId, "di model");
  //   // console.log(id);

  //   const wishlist = await this.collection().findOne({
  //     _id: new ObjectId(String(objectId)),
  //   });
  //   if (!wishlist) {
  //     let error = new Error("wishlist not found");
  //     error.name = "NotFound";
  //     throw error;
  //   }
  //   const result = await this.collection().deleteOne({
  //     _id: new ObjectId(String(objectId)),
  //   });
  //   return result;
  // }

  // static async delete(id: string) {
  //   const wishlists = database.collection("wishlist");
  //   await wishlists.deleteOne({
  //     _id: new ObjectId(id),
  //   });

  //   return NextResponse.json(
  //     { message: "Successfully deleted from wishlist!" },
  //     { status: 200 }
  //   );
  // }

  static async delete(id: string) {
    return await this.collection().deleteOne({ _id: new ObjectId(String(id)) });
  }
}

export default Wishlist;
