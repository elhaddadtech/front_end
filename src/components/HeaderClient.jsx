"use client";

import { useEffect } from "react";
import useStore from "../store/useStore"; // Zustand store
import Image from "next/image";
import { Button } from "../components/ui/button";
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
  const { getStudentData } = useStore(); // Zustand action

  useEffect(async () => {
    await getStudentData(session);
  }, [session]);

  return (
    <header className="flex h-16 items-center px-4 border-b border-border bg-background">
      <div className="lg:hidden mr-2">
        <Sidebar showToggle={true} />
      </div>
      <h1 className="text-xl font-semibold text-foreground lg:hidden">
        Student Portal
      </h1>
      <div className="ml-auto flex items-center space-x-4">
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
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="avatar online">
                <div className="w-8 h-8 rounded-full">
                  <Image
                    width={32}
                    height={32}
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  {/* <span className="text-xl">AI</span> */}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 mt-4 bg-slate-100"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {" "}
                  {session?.user?.name}{" "}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
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
