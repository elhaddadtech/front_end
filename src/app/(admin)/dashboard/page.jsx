"use client";
import "../../globals.css";
import { useEffect } from "react";
import axiosConfig from "../../../lib/axiosConfig";
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
import { useState } from "react";

export default function Page() {
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const getStatStudents = async () => {
          const stats = await axiosConfig.get("students/stats");
          setTotal(stats?.total_students);
          setActive(stats?.total_students_active);
          setInactive(stats?.total_students_inactive);
          console.log("stat", stats);
        };
        getStatStudents();
      } catch (error) {}
    }
  }, []);
  return (
    <div className="flex px-4 pr-8 flex-1 flex-col gap-4  pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className=" rounded-xl bg-muted/50">
          <StatCard title="Total Students" value={total} progress={100} />
        </div>
        <div className=" rounded-xl bg-muted/50">
          <StatCard
            title="Students Active"
            Icon={UserCheck}
            value={active}
            progress={((active / total) * 100).toFixed()}
          />
        </div>
        <div className="  rounded-xl bg-muted/50">
          <StatCard
            title="Students Inactive"
            Icon={UserX}
            value={inactive}
            progress={((inactive / total) * 100).toFixed()}
          />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
