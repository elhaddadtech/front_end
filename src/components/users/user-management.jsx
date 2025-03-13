"use client";
import axiosConfig from "../../lib/axiosConfig";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner";
import {
  Pencil,
  Search,
  Loader2,
  MoreHorizontal,
  UserPlus,
  Trash2,
  UserCog,
  ShieldCheck,
  Filter,
} from "lucide-react";

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);

  // Update the formData state to include institution_id
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
    institution_id: "",
  });

  // Add a function to fetch institutions (in a real app)
  // Add this after the fetchData function
  const [institutions, setInstitutions] = useState([]);

  // Update the fetchData function to also fetch institutions
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Use the actual API endpoints
      const usersResponse = await axiosConfig.get("/appusers");

      // In a real app, you would fetch institutions too
      // const institutionsResponse = await fetch('http://localhost:8000/api/institutions')

      setRoles(usersResponse?.roles);
      setUsers(usersResponse?.users);
      setInstitutions(usersResponse?.institutions);
    } catch (error) {
      // console.error("Error fetching data:", error);
      // toast.error("Failed to load users and roles", {
      //   description: "Please try again later.",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.email || !formData.role_id) {
        toast.error("Validation Error", {
          description: "Email and role are required fields",
        });
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Validation Error", {
          description: "Please enter a valid email address",
        });
        setIsSubmitting(false);
        return;
      }

      if (editingUser) {
        // Update existing user
        const response = await axiosConfig.put(
          `/appusers/${editingUser.id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // const response = await fetch(
        //   `http://localhost:8000/api/users/${editingUser.id}`,
        //   {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData),
        //   }
        // );

        // if (!response.ok) {
        //   throw new Error(`API request failed with status ${response.status}`);
        // }

        // Refresh data after update
        await fetchData();

        toast.success("User updated successfully", {
          description: `${formData.first_name} ${formData.last_name}'s information has been updated.`,
        });
      } else {
        // Create new user
        const response = await fetch("http://localhost:8000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        // Refresh data after create
        await fetchData();

        toast.success("User created successfully", {
          description: `${formData.first_name} ${formData.last_name} has been added to the system.`,
        });
      }

      // Reset form and close dialog
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        role_id: "",
        institution_id: "",
      });
      setEditingUser(null);
      setOpenDialog(false);
      setShowAddUser(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the handleEdit function to include institution_id
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email,
      role_id: user.role_id?.toString() || "",
      institution_id: user.institution_id?.toString() || "",
    });
    setOpenDialog(true);
  };

  const handleDelete = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Refresh data after delete
      await fetchData();

      toast.success("User deleted", {
        description: `${user.first_name} ${user.last_name} has been removed from the system.`,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", {
        description: "Please try again later.",
      });
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      role_id: "",
      institution_id: "",
    });
    setShowAddUser(true);
  };

  // Filter users based on search query and role filter
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      (user.full_name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.first_name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.last_name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.institution_libelle?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.branch_libelle?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.group_libelle?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    const matchesRole =
      roleFilter === "all" || user.role_id.toString() === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last || "U";
  };

  // Format date
  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return new Intl.DateTimeFormat("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //     }).format(date);
  //   };

  // Get role badge color
  const getRoleBadgeColor = (roleId, roleLibelle) => {
    // If we have a role_libelle, use that to determine color
    if (roleLibelle) {
      const role = roleLibelle.toLowerCase();
      if (role.includes("admin")) {
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      } else if (role.includes("teacher") || role.includes("prof")) {
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      } else if (role.includes("student") || role.includes("etudiant")) {
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      }
    }

    // Fallback to roleId if no roleLibelle or unrecognized
    switch (roleId) {
      case 1:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 2:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 3:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 4:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles?.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.libelle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAddUser} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and role assignments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers?.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                      <TableRow>
                        <TableHead className="bg-background w-[250px]">
                          User
                        </TableHead>
                        <TableHead className="bg-background">Email</TableHead>
                        <TableHead className="bg-background">Role</TableHead>
                        <TableHead className="bg-background">
                          Institution
                        </TableHead>
                        <TableHead className="bg-background">Branch</TableHead>
                        <TableHead className="bg-background text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {getInitials(user.first_name, user.last_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {user.full_name ||
                                    `${user.first_name} ${user.last_name}`}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  ID: {user.id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${getRoleBadgeColor(
                                user.role_id,
                                user.role_libelle
                              )}`}
                            >
                              {user.role_libelle ||
                                user.role?.name ||
                                "No Role"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.institution_libelle ? (
                              <div>
                                <p>{user.institution_libelle}</p>
                                {user.branch_libelle && (
                                  <p className="text-xs text-muted-foreground">
                                    {user.branch_libelle}
                                  </p>
                                )}
                                {user.group_libelle && (
                                  <p className="text-xs text-muted-foreground">
                                    Group: {user.group_libelle}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground italic">
                                N/A
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.branch_libelle == null
                              ? "N/A"
                              : user.branch_libelle}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => handleEdit(user)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Manage Permissions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDelete(user)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-60 items-center justify-center">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Update user information and role assignment"
                : "Create a new user account"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role_id">Role</Label>
                <Select
                  value={formData.role_id}
                  onValueChange={(value) =>
                    handleSelectChange("role_id", value)
                  }
                  required
                >
                  <SelectTrigger id="role_id">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        <div className="flex items-center">
                          <span>{role.libelle}</span>
                          {role.id === 1 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <ShieldCheck className="ml-2 h-4 w-4 text-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Administrator has full system access</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.role_id &&
                    roles.find((r) => r.id.toString() === formData.role_id)
                      ?.description}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution_id">Institution</Label>
                <Select
                  value={formData.institution_id?.toString() || ""}
                  onValueChange={(value) =>
                    handleSelectChange("institution_id", value)
                  }
                >
                  <SelectTrigger id="institution_id">
                    <SelectValue placeholder="Select an institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {institutions?.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.libelle.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpenDialog(false);
                  setShowAddUser(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and assign a role
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role_id">Role</Label>
                <Select
                  value={formData.role_id}
                  onValueChange={(value) =>
                    handleSelectChange("role_id", value)
                  }
                  required
                >
                  <SelectTrigger id="role_id">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        <div className="flex items-center">
                          <span>{role.libelle}</span>
                          {role.id === 1 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <ShieldCheck className="ml-2 h-4 w-4 text-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Administrator has full system access</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.role_id &&
                    roles.find((r) => r.id.toString() === formData.role_id)
                      ?.description}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution_id">Institution</Label>
                <Select
                  value={formData.institution_id?.toString() || ""}
                  onValueChange={(value) =>
                    handleSelectChange("institution_id", value)
                  }
                >
                  <SelectTrigger id="institution_id">
                    <SelectValue placeholder="Select an institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {institutions?.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.libelle.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddUser(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
