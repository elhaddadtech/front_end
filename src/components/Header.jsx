"use client";
// src/components/Header.tsx
import { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";

export default function Header() {
  const [session, setSession] = useState(null); // Use `null` for no session
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define an async function inside the useEffect callback
    const fetchSession = async () => {
      try {
        // Replace with your session fetching logic
        // const userSession = await auth();
        // setSession(userSession);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setIsLoading(false); // Always update loading state
      }
    };

    fetchSession(); // Call the async function
  }, []); // Empty dependency array to run only once on mount

  // Show a loading indicator while session data is being fetched
  if (isLoading) {
    return <div>Loading..From Header.</div>;
  }

  // Render the client component with the session data
  return <HeaderClient session={session} />;
}
