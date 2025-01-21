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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mr-8">
            <TogleDarkMode />
          </div>
        </header>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
