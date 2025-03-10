"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "../../../components/app-sidebar";
import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import { UserManagement } from "../../../components/users/user-management";
import { Loader2, Users } from "lucide-react";

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {/* <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage users and their roles
            </p>
          </div>
        </div>
      </header>
      <div className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <UserManagement />
        )}
      </div>
    </SidebarInset>
  );
}
