// src/components/Header.tsx
import { auth } from "../auth"; // Fetch session securely
import HeaderClient from "./HeaderClient"; // Client Component to render UI

export default async function Header() {
  const session = await auth(); // Fetch session from the server

  if (!session?.user) {
    redirect("/"); // Redirect to login if no session
  }

  return <HeaderClient session={session} />; // Pass session to Client Component
}
