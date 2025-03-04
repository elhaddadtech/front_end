"use client";

import RoleRedirect from "../../../../lib/RoleRedirect";
import LanguageCards from "../../../../components/LanguageCards";

const StudentPage = () => {
  return (
    // <RoleRedirect >
    <main className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">Language Dashboard</h1>
      <LanguageCards />
    </main>
    // {/* </RoleRedirect> */}
  );
};

export default StudentPage;
