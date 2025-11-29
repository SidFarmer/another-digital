"use client";

import { redirect } from "next/navigation";

// Keep `/login` alias pointing to the root login page.
export default function LoginAlias() {
  redirect("/");
}
