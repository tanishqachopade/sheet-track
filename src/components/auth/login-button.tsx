"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
      className="
        rounded-lg
        border
        px-4
        py-2
        hover:bg-gray-100
      "
    >
      Login
    </button>
  );
}