"use client";
import { FourSquare } from "react-loading-indicators";
import RoleRedirect from "../../lib/RoleRedirect";
import LanguageCards from "../../components/LanguageCards";
import { useEffect } from "react";
import "../globals.css";
const HomePage = () => {
  return (
    <div className="grid items-center h-screen w-full min-h-screen">
      {/* Centered loading indicator */}
      <RoleRedirect />
      {/* <FourSquare
          color="#A45024"
          size="medium"
          text="Loading..."
          textColor="#ffffff"
        />
      </RoleRedirect> */}
    </div>
  );
};

export default HomePage;
