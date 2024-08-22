"use client";
import { ObjectId } from "mongodb";
import React from "react";
import Swal from "sweetalert2";

const ButtonAddWishlist = ({ id }: { id: ObjectId }) => {
  const handleAdd = async () => {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const result = await fetch(link + "/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (result.ok) {
        Swal.fire({
          icon: "success",
          title: "Product added to wishlist successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await result.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to add product to wishlist: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("An error occurred while adding product to wishlist.");
    }
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-800"
      >
        Add to Wishlist
      </button>
    </>
  );
};

export default ButtonAddWishlist;
