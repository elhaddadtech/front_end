"use client";
import { FourSquare } from "react-loading-indicators";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store/useStore";
import { useSession } from "next-auth/react";

export default function RoleRedirect({ children }) {
  const { data: session, status } = useSession();
  const { getStudentData, students } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // console.log("session from RoleRedirect", session);

    const handleRedirection = async () => {
      // console.log("RoleRedirect component mounted1", session?.user?.email);
      const fetcheData = await getStudentData(session?.user?.email);
      // console.log("RoleRedirect fetcheData", fetcheData?.result?.role);
      // console.log("RoleRedirect component mounted3", students);
      if (status === "authenticated" && session?.user?.email) {
        const userRole = fetcheData?.result?.role; // Fetch user role from the API
        // console.log("RoleRedirect component mounted2", userRole);
        // Perform redirection based on role
        switch (userRole) {
          case "admin":
            router.push("/dashboard");
            break;
          case "etudiant":
            router.push("/student/dashboard");
            break;
          case "teacher":
            router.push("/teacher/home");
            break;
          default:
            router.push("/");
            break;
        }
      }
      setIsLoading(false); // Stop loading after redirection check
    };

    handleRedirection();
  }, [session?.user?.email]);

  if (isLoading) {
    return (
      <div className="grid items-center justify-center w-screen  h-screen ">
        <FourSquare
          color="#A45024"
          size="medium"
          text="loading.."
          textColor=""
        />
      </div>
    ); // Block rendering with a loading message
  }
  return children; // Render children after redirection logic completes
}
