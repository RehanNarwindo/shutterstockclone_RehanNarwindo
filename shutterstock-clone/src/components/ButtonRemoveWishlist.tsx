"use client";
import { ObjectId } from "mongodb";
import React from "react";
import Swal from "sweetalert2";

const ButtonRemoveWishlist = ({ id }: { id: ObjectId }) => {
  const handleRemove = async () => {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const result = await fetch(link + "/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (result.ok) {
        Swal.fire({
          icon: "success",
          title: "Removed from Wishlist",
          text: "Product removed from wishlist successfully!",
        }).then(() => {
          window.location.reload();
        });
      } else {
        const errorData = await result.json();
        Swal.fire({
          icon: "error",
          title: "Failed to Remove",
          text: `Failed to remove product from wishlist: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while removing product from wishlist.",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleRemove}
        className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-800"
      >
        Remove wishlist
      </button>
    </>
  );
};

export default ButtonRemoveWishlist;
