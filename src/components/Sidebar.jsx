import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"; // Ensure Radix UI Sheets are installed
import { BookOpen, Home, Menu, User } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/home", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Courses", href: "/courses", icon: BookOpen },
];

export function Sidebar({ showToggle = true }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className="bg-background space-y-4 py-4 border-r-0 sm:border-r ">
      <div className="w-full">
        <div className="space-y-1 ">
          <ScrollArea className=" -mr-8 pr-16 font-extrabold  text-2xl">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                size="lg"
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full active justify-start hover:bg-primary/50 flex items-start space-x-1"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href} className="w-full flex items-center">
                  <item.icon className="-ml-10 h-10 w-10 text-3xl " />
                  <span className=" w-10">{item.name}</span>
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
        <SheetContent
          side="left"
          className="text-start pl-0 font-extrabold text-lg w-56"
        >
          {SidebarContent}
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block w-40">{SidebarContent}</div>
    </>
  );
}
