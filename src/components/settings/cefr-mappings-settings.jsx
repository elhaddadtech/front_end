"use client";

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

export function CefrMappingsSettings() {
  const [cefrMappings, setCefrMappings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMapping, setEditingMapping] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    level: "",
    language: "",
    lesson: 0,
    seuil_heures_jours: 15,
    noteCC1_ratio: 60,
    noteCC2_ratio: 40,
  });

  // Fetch CEFR mappings from the API
  const fetchCefrMappings = async () => {
    setIsLoading(true);
    try {
      // Use the actual API endpoint
      const response = await fetch("http://localhost:8000/api/cefr-mappings");

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCefrMappings(data);
    } catch (error) {
      console.error("Error fetching CEFR mappings:", error);
      toast.error("Failed to load CEFR mappings", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCefrMappings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "lesson" ||
        name === "seuil_heures_jours" ||
        name === "noteCC1_ratio" ||
        name === "noteCC2_ratio"
          ? Number.parseInt(value, 10)
          : value,
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
      if (!formData.level || !formData.language || formData.lesson <= 0) {
        toast.error("Validation Error", {
          description: "Please fill in all required fields correctly",
        });
        setIsSubmitting(false);
        return;
      }

      // Ensure noteCC1_ratio + noteCC2_ratio = 100
      if (formData.noteCC1_ratio + formData.noteCC2_ratio !== 100) {
        toast.error("Validation Error", {
          description: "Note CC1 and CC2 ratios must sum to 100%",
        });
        setIsSubmitting(false);
        return;
      }

      // Update existing mapping using the API
      const updatePromise = fetch(
        `http://localhost:8000/api/cefr-mappings/${editingMapping.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }
          return response.json();
        })
        .then(() => {
          // Refresh the data after update
          return fetchCefrMappings();
        });

      toast.promise(updatePromise, {
        loading: "Updating CEFR mapping...",
        success: "CEFR mapping updated successfully",
        error: "Failed to update CEFR mapping",
      });

      await updatePromise;

      // Reset form and close dialog
      setFormData({
        level: "",
        language: "",
        lesson: 0,
        seuil_heures_jours: 15,
        noteCC1_ratio: 60,
        noteCC2_ratio: 40,
      });
      setEditingMapping(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating CEFR mapping:", error);
      // Error is already handled by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (mapping) => {
    setEditingMapping(mapping);
    setFormData({
      level: mapping.level,
      language: mapping.language,
      lesson: mapping.lesson,
      seuil_heures_jours: mapping.seuil_heures_jours,
      noteCC1_ratio: mapping.noteCC1_ratio,
      noteCC2_ratio: mapping.noteCC2_ratio,
    });
    setOpenDialog(true);
  };

  const filteredMappings = cefrMappings.filter(
    (mapping) =>
      mapping.level?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.language?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by level or language..."
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
          ) : filteredMappings.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-background">
                      <TableRow>
                        <TableHead className="bg-background">
                          CEFR Level
                        </TableHead>
                        <TableHead className="bg-background">
                          Language
                        </TableHead>
                        <TableHead className="bg-background">Lessons</TableHead>
                        <TableHead className="bg-background">
                          Hours to Days
                        </TableHead>
                        <TableHead className="bg-background">
                          Activity Ratio (CC1)
                        </TableHead>
                        <TableHead className="bg-background">
                          Time Ratio (CC2)
                        </TableHead>
                        <TableHead className="bg-background text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMappings.map((mapping) => (
                        <TableRow key={mapping.id}>
                          <TableCell className="font-medium">
                            {mapping.level}
                          </TableCell>
                          <TableCell>{mapping.language}</TableCell>
                          <TableCell>{mapping.lesson}</TableCell>
                          <TableCell>{mapping.seuil_heures_jours}</TableCell>
                          <TableCell>{mapping.noteCC1_ratio}%</TableCell>
                          <TableCell>{mapping.noteCC2_ratio}%</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(mapping)}
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
              <p className="text-muted-foreground">No CEFR mappings found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit CEFR Mapping</DialogTitle>
            <DialogDescription>
              Update the details for this CEFR mapping
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">CEFR Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      handleSelectChange("level", value)
                    }
                    required
                    disabled
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1">A1</SelectItem>
                      <SelectItem value="A2">A2</SelectItem>
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                      <SelectItem value="C1">C1</SelectItem>
                      <SelectItem value="C1+">C1+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson">Number of Lessons</Label>
                <Input
                  id="lesson"
                  name="lesson"
                  type="number"
                  min="1"
                  value={formData.lesson}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seuil_heures_jours">
                  Hours to Days Threshold
                </Label>
                <Input
                  id="seuil_heures_jours"
                  name="seuil_heures_jours"
                  type="number"
                  min="1"
                  value={formData.seuil_heures_jours}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="noteCC1_ratio">Note Activity Ratio (%)</Label>
                  <Input
                    id="noteCC1_ratio"
                    name="noteCC1_ratio"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.noteCC1_ratio}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noteCC2_ratio">Note Time Ratio (%)</Label>
                  <Input
                    id="noteCC2_ratio"
                    name="noteCC2_ratio"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.noteCC2_ratio}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              {formData.noteCC1_ratio + formData.noteCC2_ratio !== 100 && (
                <p className="text-sm text-destructive">
                  Note: CC1 and CC2 ratios must sum to 100% (Current:{" "}
                  {formData.noteCC1_ratio + formData.noteCC2_ratio}
                  %)
                </p>
              )}
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
