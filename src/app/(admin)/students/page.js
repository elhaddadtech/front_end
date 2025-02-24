"use client";
import { useState } from "react";
import { Sidebar } from "../../../components/ui/sidebar";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { Search } from "lucide-react";

// Mock data - replace with your actual data source
const studentsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    language: "English",
    institution: "UCAM",
    branch: "Computer Science",
    group: "A",
    semester: "3rd",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    language: "French",
    institution: "UCAM",
    branch: "Business",
    group: "B",
    semester: "2nd",
  },
  // Add more mock data as needed
];

const itemsPerPage = 10;

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter students based on search query
  const filteredStudents = studentsData.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-[#0F172A]">
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Students</h1>
          <p className="text-gray-400">Manage student information</p>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/10 border-white/10 text-white placeholder:text-gray-400 w-full md:w-[300px]"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/10 backdrop-blur-lg">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white/5 border-white/10">
                <TableHead className="text-gray-400">First Name</TableHead>
                <TableHead className="text-gray-400">Last Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Language</TableHead>
                <TableHead className="text-gray-400">Institution</TableHead>
                <TableHead className="text-gray-400">Branch</TableHead>
                <TableHead className="text-gray-400">Group</TableHead>
                <TableHead className="text-gray-400">Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-white/5 border-white/10"
                >
                  <TableCell className="text-white">
                    {student.firstName}
                  </TableCell>
                  <TableCell className="text-white">
                    {student.lastName}
                  </TableCell>
                  <TableCell className="text-white">{student.email}</TableCell>
                  <TableCell className="text-white">
                    {student.language}
                  </TableCell>
                  <TableCell className="text-white">
                    {student.institution}
                  </TableCell>
                  <TableCell className="text-white">{student.branch}</TableCell>
                  <TableCell className="text-white">{student.group}</TableCell>
                  <TableCell className="text-white">
                    {student.semester}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-white/10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
