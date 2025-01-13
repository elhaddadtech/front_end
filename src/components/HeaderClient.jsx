"use client";

import TogleDarkMode from "../components/TogleDarkMode";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Logout from "../components/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Bell, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

function HeaderClient({ session }) {
  const { getStudentData } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const email = session?.user?.email || "a.elhaddad@uca.ac.ma";
        if (email) {
          await getStudentData(email);
        } else {
          console.warn("Email is not available in session.");
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, getStudentData]);

  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "No email provided";
  const userImage = session?.user?.image || null;

  return (
    <header className="flex h-16 items-center px-4 border-b border-border bg-background">
      <div className="lg:hidden mr-4">
        <Sidebar showToggle={true} />
      </div>
      <h1 className="text-xl font-semibold text-foreground hidden lg:block ">
        Student Portal
      </h1>
      <div className="ml-auto flex items-center space-x-4">
        <TogleDarkMode />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback>{userName?.[0] || "?"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-4" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default HeaderClient;
