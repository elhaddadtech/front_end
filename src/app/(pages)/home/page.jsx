import { auth } from "../../../auth";

import { redirect } from "next/navigation";
// import StudentDashboard from "../../components/StudentDashboard";
import LanguageCards from "../../../components/LanguageCards";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
        Language Dashboard
      </h1>
      <LanguageCards />
    </div>
  );
};

export default HomePage;
