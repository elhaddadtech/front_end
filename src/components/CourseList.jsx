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
const courses = [
  {
    id: 214053,
    name: "Service après-vente",
    progress: "72%",
    grade: "96%",
    totalLessons: 2,
    language: "Français",
  },
  {
    id: 214054,
    name: "Communications pratiques (B1)",
    progress: "52%",
    grade: "98%",
    totalLessons: 4,
    language: "Français",
  },
  {
    id: 214055,
    name: "Service comptable",
    progress: "75%",
    grade: "95%",
    totalLessons: 2,
    language: "Anglais",
  },
  {
    id: 214056,
    name: "Compétence visée : Grammaire (B1)",
    progress: "49%",
    grade: "93%",
    totalLessons: 5,
    language: "Arabe",
  },
  {
    id: 214057,
    name: "Leçons vidéos : Les sciences",
    progress: "77%",
    grade: "96%",
    totalLessons: 13,
    language: "Espagnol",
  },
];

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
