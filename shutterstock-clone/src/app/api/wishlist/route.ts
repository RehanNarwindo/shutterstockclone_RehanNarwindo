import Wishlist from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-id") as string;
    console.log(userId);

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const wishlist = await Wishlist.getAll(userId);
    return new Response(JSON.stringify({ data: wishlist, userId: userId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch wishlist" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-id") as string;
    const body: { productId: string } = await request.json();
    const wishlist = await Wishlist.create({
      productId: new ObjectId(String(body.productId)),
      userId: new ObjectId(String(userId)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (wishlist === "Product already in wishlist") {
      return Response.json({ message: wishlist }, { status: 400 });
    }

    return Response.json({
      data: wishlist,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          err: error.issues.map((el) => el.path[0] + " " + el.message),
        },
        {
          status: 400,
        }
      );
    }
  }
}
// export async function DELETE(request: Request) {
//   try {
//     const body: { wishlistId: string } = await request.json();
//     console.log(body);

//     await Wishlist.delete(body.wishlistId);
//     return Response.json({ message: "success" });
//   } catch (error: any) {
//     let status = 500;
//     if (error.name === "NotFound") {
//       status = 404;
//     }
//     return Response.json(
//       { error: error.message || "Internal server error" },
//       { status: status }
//     );
//   }
// }

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    await Wishlist.delete(body.id);
    return NextResponse.json({ message: "Success Delete" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
