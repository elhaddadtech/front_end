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
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import { Pencil, Search, Loader2 } from "lucide-react";

export function RangeCefrSettings() {
  const [rangeCefrs, setRangeCefrs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRange, setEditingRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    language: "",
    scaled_score: "",
    semester: "",
  });

  // Fetch Range CEFRs from the API
  const fetchRangeCefrs = async () => {
    setIsLoading(true);
    try {
      // Use the actual API endpoint
      const response = await axiosConfig.get("/range-cefefrs");
      setRangeCefrs(response?.data);
    } catch (error) {
      console.error("Error fetching Range CEFRs:", error);
      toast.error("Failed to load Range CEFR data", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRangeCefrs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "scaled_score" ? Number.parseInt(value, 10) : value,
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
      if (!formData.language || !formData.semester || !formData.scaled_score) {
        toast.error("Validation Error", {
          description: "Please fill in all required fields",
        });
        setIsSubmitting(false);
        return;
      }

      // Update existing range using the API
      const updatePromise = axiosConfig
        .put(`/range-cefefrs/${editingRange.id}`, formData)
        .then((response) => {
          // if (!response?.ok) {
          //   throw new Error(
          //     `API request failed with status ${response.status}`
          //   );
          // }
          return response?.data;
        })
        .then(() => {
          // Refresh the data after update
          return fetchRangeCefrs();
        });

      toast.promise(updatePromise, {
        loading: "Updating Range CEFR...",
        success: "Range CEFR updated successfully",
        error: "Failed to update Range CEFR",
      });

      await updatePromise;

      // Reset form and close dialog
      setFormData({
        language: "",
        scaled_score: "",
        semester: "",
      });
      setEditingRange(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating Range CEFR:", error);
      // Error is already handled by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (range) => {
    setEditingRange(range);
    setFormData({
      language: range.language,
      scaled_score: range.scaled_score,
      semester: range.semester,
    });
    setOpenDialog(true);
  };

  const filteredRanges = rangeCefrs?.filter(
    (range) =>
      range.language?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      range.semester?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by language or semester..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredRanges?.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                      <TableRow>
                        <TableHead className="bg-background">
                          Language
                        </TableHead>
                        <TableHead className="bg-background">
                          Scaled Score
                        </TableHead>
                        <TableHead className="bg-background">
                          Semester
                        </TableHead>
                        <TableHead className="bg-background text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRanges?.map((range) => (
                        <TableRow key={range.id}>
                          <TableCell>{range.language}</TableCell>
                          <TableCell>{range.scaled_score}</TableCell>
                          <TableCell>{range.semester}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(range)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
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
              <p className="text-muted-foreground">No Range CEFR data found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Range CEFR</DialogTitle>
            <DialogDescription>
              Update the details for this Range CEFR
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleSelectChange("language", value)
                  }
                  required
                  disabled
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scaled_score">Scaled Score</Label>
                <Input
                  id="scaled_score"
                  name="scaled_score"
                  type="number"
                  min="0"
                  value={formData.scaled_score}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) =>
                    handleSelectChange("semester", value)
                  }
                  required
                  disabled
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">S1</SelectItem>
                    <SelectItem value="S2">S2</SelectItem>
                    <SelectItem value="S3">S3</SelectItem>
                    <SelectItem value="S4">S4</SelectItem>
                    <SelectItem value="S5">S5</SelectItem>
                    <SelectItem value="S6">S6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
