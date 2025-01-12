"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { BookOpen, GraduationCap, Home, LineChart, Menu, User } from 'lucide-react';
import { useState } from 'react';

const sidebarItems = [
  { name: 'Dashboard', href: '/home', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  // { name: 'Grades', href: '/grades', icon: GraduationCap },
  // { name: 'Analytics', href: '/analytics', icon: LineChart },
];

export function Sidebar({ showToggle = true }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className=" bg-background space-y-4 py-4 border-r-0 sm:border-r h-[100vh]">
      <div className="px-2 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          Student Portal
        </h2>
        <div className="space-y-1">
          <ScrollArea className=" px-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start hover:bg-primary/20 flex items-start space-x-5" // Adding space between icon and text
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href} className="w-full">
                  <item.icon className="h-8 w-8 " />
                  <span className='w-[20rem]'>{item.name}</span> {/* Add span to wrap the text */}
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
      <Button variant="outline" size="icon" className="lg:hidden ">
        <Menu className="h-6 w-6" />
        <span className="sr-only ">Toggle sidebar</span>
      </Button>
    </SheetTrigger>
  ) : null;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {SidebarToggle}
        <SheetContent side="left" className="text-start pl-0 font-extrabold text-lg w-64">
          {SidebarContent}
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block w-52">
        {SidebarContent}
      </div>
    </>
  );
}
