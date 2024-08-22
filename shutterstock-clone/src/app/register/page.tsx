"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(newData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    event.preventDefault();
    try {
      const res = await fetch(link + "/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created.",
      }).then(() => {
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
        });
      });
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "There was an error processing your request.",
      });
    }
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174868.png"
            alt="Logo"
            height={50}
            width={50}
            className="object-cover mx-auto mb-6"
          />
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
                onChange={changeHandler}
                value={formData.name}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                name="username"
                type="text"
                id="username"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
                onChange={changeHandler}
                value={formData.username}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
                onChange={changeHandler}
                value={formData.email}
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
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700"
                onChange={changeHandler}
                value={formData.password}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
                style={{ backgroundColor: "#DA3742", borderColor: "#DA3742" }}
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
