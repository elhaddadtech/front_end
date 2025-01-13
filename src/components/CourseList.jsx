"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import CourseCard from "./CourseCard";
import useStore from "../store/useStore";

export default function CourseList() {
  const { allCourses } = useStore();
  const [hydrated, setHydrated] = useState(false);
  const languages = Array.from(
    new Set(allCourses.map((course) => course.language))
  );
  useEffect(() => {
    setHydrated(true); // Ensure client-side rendering
  }, []);

  if (!hydrated) {
    return <div>Loading...AA</div>; // Fallback during hydration
  }
  return (
    <div className="space-y-8">
      {!allCourses.length && <div>No courses found.</div>}
      {languages?.map((language) => (
        <Card key={language} className="bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              {language}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap -mx-2">
              {allCourses
                .filter((course) => course.language === language)
                .map((course, index, filteredCourses) => (
                  <div
                    key={course.id}
                    className={`p-2 flex ${
                      filteredCourses.length === 1
                        ? "w-full"
                        : filteredCourses.length % 2 === 1 &&
                          index === filteredCourses.length - 1
                        ? "w-full"
                        : "w-full sm:w-1/2"
                    }`}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
