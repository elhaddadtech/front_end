"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import useStore from "../store/useStore";

export default function CourseProgress({ language }) {
  const { languages, allCourses } = useStore();

  const courses = languages
    ? allCourses.filter((course) => course.language === language)
    : allCourses;

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium ">{course.name}</span>
                <Badge variant="outline" className="text-primary">
                  {course.language}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm text-red-foreground">
                  <span>Progressa: {course.progress}</span>
                  <span>Lessons: {course.total_lessons}</span>
                </div>
                <Progress value={parseInt(course.progress)} className="h-2 " />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm text-red-foreground">
                  <span>Grade: {course.grade}</span>
                </div>
                <Progress value={parseInt(course.grade)} className="h-2 " />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
