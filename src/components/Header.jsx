// src/components/Header.tsx
import { auth } from "../auth";

import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await auth();

  // if (!session?.user) {
  //   redirect("/"); // Redirect to login if no session
  // }

  return <HeaderClient session={session} />; // Pass session to Client Component
}
