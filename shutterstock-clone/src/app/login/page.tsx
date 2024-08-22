"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    event.preventDefault();
    const res = await fetch(link + "/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (!res.ok) {
      return Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.message,
      });
    }
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have successfully logged in.",
    }).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/stateless-thedailyfandom-org/2021/05/eb4099c3-featured-image.jpg')",
        }}
      ></div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Login to your account to continue
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                onChange={handleChange}
                value={user.email}
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                value={user.password}
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
                style={{ backgroundColor: "#DA3742", borderColor: "#DA3742" }}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href={"/register"}>
              <button className="text-blue-600 hover:underline">
                Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
