// StudentsPage.tsx

import StudentsDataTable from "../../../components/students/students-data-table";
import { Separator } from "../../../components/ui/separator";
import { SidebarInset, SidebarTrigger } from "../../../components/ui/sidebar";

export default function StudentsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all student information
          </p>
        </div>
      </header>
      <div className="p-4">
        <StudentsDataTable />
      </div>
    </SidebarInset>
  );
}
