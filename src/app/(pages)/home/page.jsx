"use client";
import LanguageCards from "../../../components/LanguageCards";
// import { Suspense } from "react";
// import Modal from "../../../components/Modal";

const HomePage = () => {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">Language Dashboard</h1>
      {/* <Modal /> */}

      <LanguageCards />
    </main>
  );
};

export default HomePage;
