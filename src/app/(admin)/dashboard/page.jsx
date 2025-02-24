import "../../globals.css";
import { Users, UserCheck, UserX } from "lucide-react";
import { AppSidebar } from "../../../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import TogleDarkMode from "../../../components/TogleDarkMode";

import StatCard from "../../../components/StatCard";

export default function Page() {
  return (
    <div className="flex px-4 pr-8 flex-1 flex-col gap-4  pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className=" rounded-xl bg-muted/50">
          <StatCard title="Total Students" value={4000} progress={100} />
        </div>
        <div className=" rounded-xl bg-muted/50">
          <StatCard
            title="Students Active"
            Icon={UserCheck}
            value={2600}
            progress={60}
          />
        </div>
        <div className="  rounded-xl bg-muted/50">
          <StatCard
            title="Students Inactive"
            Icon={UserX}
            value={1400}
            progress={40}
          />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
