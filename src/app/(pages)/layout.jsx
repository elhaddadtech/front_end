"use client";
import { React, useEffect } from "react"; // Import React
import "../globals.css";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function RootLayout({ children }) {
  // const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    // setLoaded(true); // Uncommented to trigger rendering when loaded
    document.body.setAttribute("cz-shortcut-listen", "true");
  }, []);
  // if (loaded) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="text-foreground flex-1 overflow-y-auto p-2">
      <div className="flex flex-col h-screen lg:flex-row">
        <Sidebar showToggle={false} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
