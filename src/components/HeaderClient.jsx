"use client";

import TogleDarkMode from "../components/TogleDarkMode";
import { useEffect } from "react";
import useStore from "../store/useStore";
// import Image from "next/image";
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

export default function HeaderClient({ session }) {
  const { getStudentData } = useStore();

  useEffect(() => {
    async function fetchData() {
      await getStudentData("a.elhaddad@uca.ac.ma");
    }
    fetchData();
  }, []);

  return (
    <header className="flex h-16 items-center px-4 border-b border-border bg-background">
      <div className="lg:hidden mr-4">
        <Sidebar showToggle={true} />
      </div>
      <h1 className="text-xl font-semibold text-foreground lg:hidden">
        Student Portal
      </h1>
      <div className="ml-auto flex items-center space-x-4">
        <TogleDarkMode />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session?.user?.image || "/default-avatar.png"}
                alt={session?.user?.name || "Default User"}
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-4 " align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || "Guest User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email || "No email provided"}
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
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
