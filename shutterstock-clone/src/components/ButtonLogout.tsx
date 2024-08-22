import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function ButtonLogout() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          cookies().delete("Authorization");
          redirect("/login");
        }}
      >
        <button
          type="submit"
          className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-800"
        >
          Logout
        </button>
      </form>
    </>
  );
}
