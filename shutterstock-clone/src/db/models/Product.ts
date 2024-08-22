import { z } from "zod";
import database from "../mongodb";
import { ObjectId } from "mongodb";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string(),
  excerpt: z.string(),
  price: z.number(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
});

type ProductType = z.infer<typeof ProductSchema>;

type inputProductType = {
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price: number;
  tags?: string[];
  thumbnail: string;
  images?: string[];
};

class Product {
  static collection() {
    return database.collection<ProductType>("products");
  }
  static async getAll(name: string | null, page: string | null) {
    const limit = 8;
    const currentPage = page || 1;

    const products = await this.collection()
      .find({ name: { $regex: name || "", $options: "i" } })
      .skip((Number(currentPage) - 1) * limit)
      .limit(name ? 20 : limit)
      .toArray();
    return products;
  }

  // const filter = name ? { name: { $regex: name, $options: "i" } } : {};

  // // const totalProducts = await this.collection().countDocuments(filter);

  // const products = await this.collection()
  //   .find(filter)
  //   .skip((currentPage - 1) * limit)
  //   .limit(limit)
  //   .toArray();

  // return {
  //   // products,
  //   // currentPage,
  //   // totalPages: Math.ceil(totalProducts / limit),
  //   // totalProducts,
  // };
  // }
  static async getById(id: string) {
    const product = await this.collection().findOne({
      _id: new ObjectId(String(id)),
    });
    if (!product) {
      let error = new Error("product not found");
      error.name = "Not Found";
      throw error;
    }
    return product;
  }
  static async getBySlug(slug: string) {
    const product = await this.collection().findOne({
      slug: slug,
    });
    if (!product) {
      let error = new Error("product not found");
      error.name = "Not Found";
      throw error;
    }
    return product;
  }
}

export default Product;
