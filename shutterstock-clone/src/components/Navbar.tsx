// "use client";

import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonLogout } from "./ButtonLogout";
import Image from "next/image";

const Navbar = () => {
  const getCookies = cookies().get("Authorization");
  let isLogin;

  if (getCookies) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return (
    <>
      <nav className="navbar bg-white h-15 shadow-md p-5 m-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="https://cdn.phenompeople.com/CareerConnectResources/SHUTUS/images/1200x630-1698860660075.jpg"
                  alt="Navbar Image"
                  className="h-10 w-40 object-cover"
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <button className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-800">
                Wishlist
              </button>
            </Link>
            {isLogin ? (
              <ButtonLogout />
            ) : (
              <Link href={"/login"} className="btn btn-primary">
                Login
              </Link>
            )}

            <div className="relative ml-4"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
