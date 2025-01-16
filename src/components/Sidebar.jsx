"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { BookOpen, GraduationCap, Home, Menu, User } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
const sidebarItems = [
  { name: "Dashboard", href: "/student/dashboard", icon: Home },
  { name: "Profile", href: "/student/profile", icon: User },
  { name: "Courses", href: "/student/courses", icon: BookOpen },
  { name: "progression", href: "/student/progression", icon: GraduationCap },
];

export function Sidebar({ showToggle = true }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className="space-y-4 py-4 border-r-[0.1px] h-[100vh]">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Student Portal
        </h2>
        <div className="space-y-1">
          <ScrollArea className="px-1">
            {sidebarItems.map(({ name, href, icon: Icon }) => (
              <Button
                key={href}
                variant={pathname === href ? "secondary" : "ghost"}
                className="w-full justify-start hover:bg-primary/20  flex items-center space-x-4"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={href} className="w-full">
                  <Icon className="h-5 w-5" />
                  <span className="w-[10rem]">{name}</span>
                </Link>
              </Button>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );

  const SidebarToggle = showToggle ? (
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </SheetTrigger>
  ) : null;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {SidebarToggle}
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block w-64">{SidebarContent}</div>
    </>
  );
}
