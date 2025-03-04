"use client";
import RoleRedirect from "../../lib//RoleRedirect";
import { SessionProvider } from "next-auth/react";
import { React, useEffect, useState } from "react"; // Import React
import "../globals.css";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { ThemeProvider } from "../../components/theme-provider";
export default function RootLayout({ children }) {
  // const [loaded, setLoaded] = React.useState(false);

  const [theme, setTheme] = useState(null); // Initial state is `null`

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.setAttribute("cz-shortcut-listen", "true");
      // Only run on the client side
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme("light"); // Default theme if none is saved
      }
    }
  }, []);

  return (
    <SessionProvider>
      <RoleRedirect>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="text-foreground flex-1 overflow-y-auto bg-background">
            <div className="flex flex-col h-screen lg:flex-row">
              <Sidebar showToggle={false} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </RoleRedirect>
    </SessionProvider>
  );
}
