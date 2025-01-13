"use client";
// src/components/Header.tsx
import { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";
import { useSession } from "next-auth/react";
import useStore from "../store/useStore";

export default function Header() {
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true
  const { data: session, status } = useSession();
  const { getStudentData } = useStore();

  useEffect(() => {
    // Only run if session is available
    const fetchStudentData = async () => {
      if (session?.user?.email) {
        console.log("Session data:", session);

        // Get student data from the server and store session info
        await getStudentData(session.user.email);
        sessionStorage.setItem("userEmail", session.user.email);

        // After data is fetched, set loading to false
        setIsLoading(false);
      }
    };

    // Call the function inside useEffect
    if (session) {
      fetchStudentData();
    }
  }, [session, getStudentData]); // Dependency array ensures effect runs when session changes

  // Show a loading indicator while session data is being fetched
  // if (isLoading || status === "loading") {
  //   return <div>Loading... From Header</div>;
  // }

  // Render the client component with the session data
  return <HeaderClient session={session} />;
}
