import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";

export default function CourseCard({ course }) {
  return (
    <Card className=" transition-all duration-300 hover:scale-105 flex flex-col w-full">
      <CardHeader>
        <CardTitle className="text-lg">{course.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{course.progress}</span>
            </div>
            <Progress value={parseInt(course.progress)} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Grade</span>
              <span className="text-sm font-medium">{course.grade}</span>
            </div>
            <Progress value={parseInt(course.grade)} className="h-2" />
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-4">
          Total Lessons: {course.totalLessons}
        </div>
      </CardContent>
    </Card>
  );
}
