import Product from "@/db/models/Product";

type BySlugParams = {
  params: {
    slug: string;
  };
};

export async function GET(request: Request, { params }: BySlugParams) {
  try {
    const product = await Product.getBySlug(params.slug);
    return Response.json({ product });
  } catch (error: any) {
    if (error.name === "BSONError") {
      return Response.json({ msg: "Invalid slug" }, { status: 400 });
    }
    if (error.name === "NotFound") {
      return Response.json({ msg: error.message }, { status: 404 });
    }
    return Response.json({ error }, { status: 500 });
  }
}
