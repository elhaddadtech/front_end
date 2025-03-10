"use client";
import axiosConfig from "../../lib/axiosConfig";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

/**
 * Fetches student results from the API with pagination, filtering and search
 * @param {number} page - Page number
 * @param {object} filters - Filter options
 * @param {string} search - Search query
 * @returns {Promise<{data: Array, meta: {current_page: number, last_page: number, total: number, per_page: number}}>}
 */
const fetchResults = async (page = 1, filters = {}, search = "") => {
  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);

    if (search) {
      queryParams.append("search", search);
    }

    if (filters.institution) {
      queryParams.append("institution", filters.institution);
    }

    if (filters.language) {
      queryParams.append("language", filters.language);
    }

    if (filters.level) {
      queryParams.append("level", filters.level);
    }

    // Make the API request
    const response = await fetch(
      `http://localhost:8000/api/results?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data || [],
      meta: {
        current_page: result.meta?.current_page || page,
        last_page: result.meta?.last_page || 1,
        total: result.meta?.total || 0,
        per_page: result.meta?.per_page || 10,
      },
    };
  } catch (error) {
    console.error("Error fetching results:", error);
    // Return an empty result set if the API call fails
    return {
      data: [],
      meta: {
        current_page: page,
        last_page: 1,
        total: 0,
        per_page: 10,
      },
    };
  }
};

const columns = [
  {
    accessorKey: "full_name",
    header: "full Name",
    cell: ({ row }) =>
      row.getValue("full_name") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "language_libelle",
    header: "Language",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.getValue("language_libelle")}</Badge>
    ),
  },
  {
    accessorKey: "institution_libelle",
    header: "Institution",
    cell: ({ row }) =>
      row.getValue("institution_libelle") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "branch_libelle",
    header: "Branch",
    cell: ({ row }) =>
      row.getValue("branch_libelle") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "group_libelle",
    header: "Group",
    cell: ({ row }) =>
      row.getValue("group_libelle") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "semester_libelle",
    header: "Semester",
    cell: ({ row }) =>
      row.getValue("semester_libelle") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "Total Lessons",
    header: "Total Lessons",
    cell: ({ row }) =>
      row.getValue("Total Lessons") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "total_time",
    header: "Total Time",
    cell: ({ row }) =>
      row.getValue("total_time") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "score_test_1",
    header: "Score Test 1",
    cell: ({ row }) =>
      row.getValue("score_test_1") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "level_test_1",
    header: "Level Test 1",
    cell: ({ row }) =>
      row.getValue("level_test_1") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "score_test_2",
    header: "Score Test 2",
    cell: ({ row }) =>
      row.getValue("score_test_2") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "level_test_2",
    header: "Level Test 2",
    cell: ({ row }) =>
      row.getValue("level_test_2") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "score_test_3",
    header: "Score Test 3",
    cell: ({ row }) =>
      row.getValue("score_test_3") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "level_test_3",
    header: "Level Test 3",
    cell: ({ row }) =>
      row.getValue("level_test_3") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "Max_score_test",
    header: "Max Score Test",
    cell: ({ row }) =>
      row.getValue("Max_score_test") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "Max_level_test",
    header: "Max Level Test",
    cell: ({ row }) =>
      row.getValue("Max_level_test") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "noteCC1",
    header: "Note CC1",
    cell: ({ row }) =>
      row.getValue("noteCC1") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "noteCC2",
    header: "Note CC2",
    cell: ({ row }) =>
      row.getValue("noteCC2") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "noteCC",
    header: "Note CC",
    cell: ({ row }) =>
      row.getValue("noteCC") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
  {
    accessorKey: "note_ceef",
    header: "Note CEEF",
    cell: ({ row }) =>
      row.getValue("note_ceef") || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
];

export default function ResultsDataTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 30,
    pageCount: 0,
    total: 0,
  });
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedInstitution, setSelectedInstitution] = React.useState(null);
  const [selectedBranch, setSelectedBranch] = React.useState(null); // New state for selected branch
  const [selectedLevel, setSelectedLevel] = React.useState(null);
  const [viewMode, setViewMode] = React.useState("table");
  const [isLoading, setIsLoading] = React.useState(false);
  // State variables for filters data
  const [institutions, setInstitutions] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [levels, setLevels] = React.useState([]);

  // Fetch data
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      // Construct query parameters
      let url = `/results?page=${pagination.pageIndex + 1}`;
      // Make the API request using axiosConfig
      const response = await axiosConfig.get(url);

      // Set data from the response
      setData(response?.results?.data || []);

      // Update pagination information
      setPagination((prev) => ({
        ...prev,
        pageCount: response?.results?.last_page || 1,
        total: response?.results?.total || 0,
      }));

      // Set institutions data if available in the response
      if (response?.institution) {
        setInstitutions(response.institution);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, searchQuery, selectedInstitution, selectedLevel]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      async function fetchResults(page) {
        const response = await axiosConfig.post(
          `/results/institution?page=${page + 1}`,
          {
            institution: selectedInstitution, // Use selected institution
            branch: selectedBranch, // Use selected branch
          }
        );

        setData(response?.results?.data || []);
        setBranches(response?.branches);
        // Update pagination information
        setPagination((prev) => ({
          ...prev,
          pageCount: response?.results?.last_page || 1,
          total: response?.results?.total || 0,
        }));
      }

      if (selectedInstitution !== null && selectedInstitution !== "null") {
        fetchResults(pagination.pageIndex);
      } else {
        if (searchQuery) {
          fetchResults(searchQuery, page); // Handle pagination with search query
        } else {
          fetchData(); // Handle pagination without search
        }
      }
    }
  }, [selectedInstitution, selectedBranch, pagination.pageIndex]); // selectedBranch, page, searchQuery
  const handleSearch = async () => {
    if (searchInput !== "") {
      setSearchQuery(searchInput);

      try {
        const response = await axiosConfig.post("results", { searchInput });

        // Set data from the response
        setData(response?.results?.data || []);

        // Update pagination information
        setPagination((prev) => ({
          ...prev,
          pageCount: response?.results?.last_page || 1,
          total: response?.results?.total || 0,
        }));
      } catch (error) {
        setData([]);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput !== "") {
      handleSearch();
    }
  };

  const resetFilters = () => {
    setSelectedInstitution(null);
    setSelectedBranch(null);
    setSelectedLevel(null);
    setSearchInput("");
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        setPagination((prev) => ({
          ...prev,
          pageIndex: newPagination.pageIndex,
          pageSize: newPagination.pageSize,
        }));
      }
    },
    manualPagination: true,
    pageCount: pagination.pageCount,
  });

  const ExportResultsByInstitutionToCSV = async () => {
    try {
      setIsLoading(true); // Start loading
      // Fetch institution name based on selectedInstitution
      const branch = selectedBranch == "all" ? null : selectedBranch;

      // Default to "students" if no institution is found
      const fileName = selectedInstitution
        ? `resullts_${selectedInstitution}_${
            selectedBranch == null ? "all" : selectedBranch
          }.csv`
        : "results.csv";

      const response = await axiosConfig.get(
        `courses/export/${selectedInstitution}/${branch}`
      );
      // console.log("response", response);

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by first name,last name or email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            className="sm:w-auto"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
                {(selectedInstitution || selectedLevel) && (
                  <Badge
                    variant="secondary"
                    className="ml-1 rounded-sm px-1 font-normal"
                  >
                    {
                      [selectedInstitution, selectedLevel].filter(Boolean)
                        .length
                    }
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-4" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Institution</h4>
                  <Select
                    value={selectedInstitution || ""}
                    onValueChange={(value) =>
                      setSelectedInstitution(value || null)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All institutions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All institutions</SelectItem>
                      {institutions?.map((institution) => (
                        <SelectItem
                          key={institution.id}
                          value={institution.libelle.toUpperCase()}
                          className="capitalize"
                        >
                          {institution.libelle.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Branches</h4>
                  <Select
                    value={selectedBranch || ""}
                    onValueChange={(value) => setSelectedBranch(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {branches?.map((branch) => (
                        <SelectItem
                          key={branch.id}
                          value={branch.libelle.toUpperCase()}
                          className="capitalize"
                        >
                          {branch.libelle.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <h4 className="font-medium leading-none">Level</h4>
                  <Select
                    value={selectedLevel || ""}
                    onValueChange={(value) => setSelectedLevel(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All levels</SelectItem>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="mt-2"
                >
                  Reset filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Columns</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "full_name"
                      ? "Student Name"
                      : column.id === "institution_libelle"
                      ? "Institution"
                      : column.id === "branch_libelle"
                      ? "Branch"
                      : column.id === "semester_libelle"
                      ? "Semester"
                      : column.id === "language_libelle"
                      ? "Language"
                      : column.id === "level_test_1"
                      ? "Level"
                      : column.id === "score_test_1"
                      ? "Score"
                      : column.id === "date_test_1"
                      ? "Test Date"
                      : column.id === "total_time"
                      ? "Total Time"
                      : column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => ExportResultsByInstitutionToCSV()}
            variant="outline"
            size="sm"
            className="h-8 gap-1 "
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
          <div className="hidden sm:block">
            <Tabs
              defaultValue="table"
              onValueChange={(value) => setViewMode(value)}
            >
              <TabsList className="h-8">
                <TabsTrigger value="table" className="text-xs px-2">
                  Table
                </TabsTrigger>
                <TabsTrigger value="cards" className="text-xs px-2">
                  Cards
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Active filters display */}
      {(selectedInstitution ||
        selectedBranch ||
        selectedLevel ||
        searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1 px-2">
              Search: {searchQuery}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchInput("");
                }}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          )}
          {selectedInstitution && (
            <Badge variant="secondary" className="gap-1 px-2 capitalize">
              Institution: {selectedInstitution}
              <button
                onClick={() => setSelectedInstitution(null)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          )}
          {selectedBranch && (
            <Badge variant="secondary" className="gap-1 px-2 capitalize">
              Branch: {selectedBranch}
              <button
                onClick={() => setSelectedBranch(null)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          )}

          {selectedLevel && (
            <Badge variant="secondary" className="gap-1 px-2">
              Level: {selectedLevel}
              <button
                onClick={() => setSelectedLevel(null)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <span className="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-7 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Student Results</span>
            <div className="sm:hidden">
              <Tabs
                defaultValue="table"
                onValueChange={(value) => setViewMode(value)}
              >
                <TabsList className="h-8">
                  <TabsTrigger value="table" className="text-xs px-2">
                    Table
                  </TabsTrigger>
                  <TabsTrigger value="cards" className="text-xs px-2">
                    Cards
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : viewMode === "table" ? (
            <div className="relative rounded-md">
              <ScrollArea
                className="h-[600px] w-full rounded-md border"
                type="always"
              >
                <Table>
                  <TableHeader className="sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="bg-background">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
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
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          ) : (
            <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.length ? (
                data.map((result) => (
                  <Card key={result.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {result.full_name.trim() !== ""
                              ? result.full_name
                              : "Unnamed Student"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {result.email}
                          </p>
                        </div>
                        {result.level_test_1 && (
                          <Badge
                            variant={
                              result.level_test_1 === "A1" ||
                              result.level_test_1 === "A2"
                                ? "secondary"
                                : result.level_test_1 === "B1" ||
                                  result.level_test_1 === "B2"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {result.level_test_1}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Institution</p>
                          <p className="font-medium capitalize">
                            {result.institution_libelle || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Language </p>
                          <p className="font-medium capitalize ">
                            {result.language_libelle}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Score</p>
                          <p className="font-medium">
                            {result.score_test_1 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CNE</p>
                          <p className="font-medium">{result.cne || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Semester</p>
                          <p className="font-medium">
                            {result.semester_libelle || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-muted-foreground text-sm">
                          Total Time
                        </p>
                        <p className="font-medium">
                          {result.total_time || "N/A"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No results found.</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              {data.length ? pagination.pageIndex * pagination.pageSize + 1 : 0}{" "}
              to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                pagination.total
              )}{" "}
              of {pagination.total} results
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Page {pagination.pageIndex + 1} of {pagination.pageCount} (
                {pagination.total} total students)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1 text-sm font-medium">
                  Page
                  <Input
                    className="h-8 w-12"
                    type="number"
                    min={1}
                    max={pagination.pageCount}
                    value={pagination.pageIndex + 1}
                    onChange={(e) => {
                      const newPage = e.target.value
                        ? Number(e.target.value)
                        : 1;
                      table.setPageIndex(newPage - 1);
                    }}
                  />
                  of {pagination.pageCount}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
