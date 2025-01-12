import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import LanguageCards from "../../../components/LanguageCards";
import { Suspense } from "react";

const HomePage = async () => {
  const session = await auth();

  // Redirect unauthenticated users
  // if (!session?.user) {
  //   redirect("/");
  // }

  // Log only for debugging (ensure it doesn't vary between server/client)
  if (process.env.NODE_ENV === "development") {
    console.log(
      "Rendering HomePage on",
      typeof window === "undefined" ? "server" : "client"
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">Language Dashboard</h1>
      {/* LanguageCards should handle its own loading/fallback */}
      <LanguageCards />
    </div>
  );
};

export default HomePage;
