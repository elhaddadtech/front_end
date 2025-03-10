"use client";
import axiosConfig from "../../lib/axiosConfig";
import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  SearchCheck,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
export default function StudentsDataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [students, setStudents] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [institutions, setInstitutions] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalStudent, setTotalStudent] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedInstitution, setSelectedInstitution] = React.useState(null); // New state for selected institution
  const [selectedBranch, setSelectedBranch] = React.useState(null); // New state for selected branch
  const [searchQuery, setSearchQuery] = React.useState(""); // New state for search query
  const searchStudent = React.useRef();
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState("idle");

  const ExportStudentByInstitution = async () => {
    try {
      setIsLoading(true); // Start loading
      // Fetch institution name based on selectedInstitution
      const institutionName = institutions?.find(
        (institution) => institution.id === selectedInstitution
      )?.libelle; // Assuming the institution has a `libelle` property for the name

      // Default to "students" if no institution is found
      const fileName = institutionName
        ? `students_${institutionName}.csv`
        : "students.csv";

      const response = await axiosConfig.post(`/students/export`, {
        institution_id: selectedInstitution, // Pass selected institution
        responseType: "blob", // Important to handle the file as a blob
      });

      // Create a download link for the CSV file
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Use dynamically generated filename
      document.body.appendChild(link);
      link.click(); // Trigger download
      link.remove(); // Clean up the link element
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setIsLoading(false); // Stop loading once the export is complete
    }
  };

  // Fetch users
  const Getstudents = async (pageNumber = page) => {
    const response = await axiosConfig.get(`/users?page=${pageNumber}`);
    setStudents(response?.students?.data);
    setTotalPages(response?.students?.last_page);
    setTotalStudent(response?.students?.total);
    setInstitutions(response?.institutions);
  };

  const GetSearchStudent = async (searchA, pageNumber = page) => {
    const search = searchA.trim(); // Trim search query
    setSearchQuery(searchA); // Set search query state
    setStudents([]); // Clear previous data
    if (search === "") {
      Getstudents(pageNumber); // Call Getstudents when search is cleared
      return;
    }
    const response = await axiosConfig.post(`/students/search`, {
      search,
      page: pageNumber, // Pass page number to handle pagination
    });
    setStudents(response?.students?.data);
    setTotalPages(response?.students?.last_page);
    setTotalStudent(response?.students?.total);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("Invalid file:", file);
      return;
    }

    setIsUploading(true);

    // // Simulate a delay of 8 seconds before the upload starts
    // await new Promise((resolve) => setTimeout(resolve, 8000));

    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      const response = await axiosConfig.post("/students/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      setIsUploading(false); // Set uploading state to false after the request is done
    } catch (error) {
      setIsUploading(false); // Handle error and stop uploading
      console.error("Upload error:", error.response?.data || error.message);
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedInstitution == null || selectedInstitution == "null") {
        if (searchQuery === "") {
          Getstudents(page); // Only call Getstudents if no search query
        }
      }
    }
  }, [institutions, page, selectedInstitution, searchQuery]); // Include searchQuery in the dependency array

  // Fetch students based on the selected institution
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      async function fetchStudents() {
        const response = await axiosConfig.post(
          `/students/institution?page=${page}`,
          {
            institution_id: selectedInstitution, // Use selected institution
            branch_id: selectedBranch, // Use selected branch
          }
        );
        setStudents(response?.students?.data);
        setBranches(response?.branches);
        setTotalPages(response?.students?.last_page);
        setTotalStudent(response?.students?.total);
      }

      if (selectedInstitution !== null && selectedInstitution !== "null") {
        fetchStudents();
      } else {
        if (searchQuery) {
          GetSearchStudent(searchQuery, page); // Handle pagination with search query
        } else {
          Getstudents(page); // Handle pagination without search
        }
      }
    }
  }, [selectedInstitution, selectedBranch, page, searchQuery]);

  // Reset selected branch when selected institution changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedBranch(null); // Reset branch selection
    }
  }, [selectedInstitution]); // Dependency on selectedInstitution

  const columns = [
    {
      accessorKey: "first_name",
      header: "First Name",
      cell: ({ row }) => <div>{row.getValue("first_name")}</div>,
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: ({ row }) => <div>{row.getValue("last_name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "institution_libelle",
      header: "Institution",
      cell: ({ row }) => (
        <div className=" uppercase">{row.getValue("institution_libelle")}</div>
      ),
    },
    {
      accessorKey: "branch_libelle",
      header: "Branch",
      cell: ({ row }) => (
        <div className=" uppercase">{row.getValue("branch_libelle")}</div>
      ),
    },
    {
      accessorKey: "group_libelle",
      header: "Group",
      cell: ({ row }) => (
        <div className=" uppercase">{row.getValue("group_libelle")}</div>
      ),
    },
    {
      accessorKey: "semester_libelle",
      header: "Semester",
      cell: ({ row }) => <div>{row.getValue("semester_libelle")}</div>,
    },
    {
      accessorKey: "cne",
      header: "CNE",
      cell: ({ row }) => (
        <div className=" uppercase">{row.getValue("cne")}</div>
      ),
    },
    {
      accessorKey: "apogee",
      header: "Apogee",
      cell: ({ row }) => <div>{row.getValue("apogee")}</div>,
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Input
              placeholder="Search by name..."
              className="w-96"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  GetSearchStudent(searchStudent.current.value);
                }
              }}
              ref={searchStudent}
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={() => GetSearchStudent(searchStudent.current.value)}
            >
              <SearchCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
            <Select onValueChange={setSelectedInstitution}>
              {" "}
              {/* Set selected institution */}
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by institution" />
              </SelectTrigger>
              <SelectContent className="text-md font-bold text-center">
                <SelectItem value="null" className="text-blue-400">
                  All Institutions
                </SelectItem>
                {institutions?.map((institution) => (
                  <SelectItem key={institution.id} value={institution.id}>
                    {" "}
                    {/* Set institution id */}
                    {institution.libelle.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected Branch */}
            <Select onValueChange={setSelectedBranch}>
              {" "}
              {/* Set selected institution */}
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent className="text-md font-bold text-center">
                <SelectItem value="null" className="text-blue-400">
                  All Institutions
                </SelectItem>
                {branches?.map((branche) => (
                  <SelectItem key={branche.id} value={branche.id}>
                    {" "}
                    {/* Set institution id */}
                    {branche.libelle.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => ExportStudentByInstitution()}
              variant="default"
              size="sm"
              className="h-8 gap-1 text-primary"
              disabled={
                selectedInstitution === null ||
                selectedInstitution === "null" ||
                isLoading
              }
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-4 w-4 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12a8 8 0 118 8"
                  />
                </svg>
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {isLoading ? "Exporting..." : "Export"}
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className={`h-8 gap-1 relative group ${
                  isUploading ? "opacity-80 pointer-events-none" : ""
                }`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">
                  {isUploading ? "Uploading..." : "Upload CSV"}
                </span>
                <span
                  className="absolute inset-0 cursor-pointer"
                  onClick={() =>
                    !isUploading &&
                    document.getElementById("file-upload").click()
                  }
                />
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleFileUpload(e.target.files[0]);
                    e.target.value = "";
                  }
                }}
              />
              {uploadStatus !== "idle" && (
                <div
                  className={`absolute -top-1 -right-1 flex h-3 w-3 ${
                    uploadStatus === "success" ? "bg-green-500" : "bg-red-500"
                  } rounded-full`}
                ></div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <Table className="">
            <TableHeader className="sticky top-0 z-10 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-2 border-b sticky top-0 z-50"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="b py-2 text-md font-bold "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages} ({totalStudent} total students)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 text-sm font-medium">
              Page
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const newPage = e.target.value ? Number(e.target.value) : 1;
                  setPage(newPage);
                }}
              />
              of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
