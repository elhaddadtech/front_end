import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

const allCourses = [
  {
    id: 214053,
    cours_name: "Service après-vente",
    cours_progress: "72%",
    cours_grade: "96%",
    total_lessons: 2,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214054,
    cours_name: "Communications pratiques (B1)",
    cours_progress: "52%",
    cours_grade: "98%",
    total_lessons: 4,
    langue: "french",
  },
  {
    id: 214055,
    cours_name: "Service comptable",
    cours_progress: "75%",
    cours_grade: "95%",
    total_lessons: 2,
    langue: "english",
  },
  {
    id: 214056,
    cours_name: "Compétence visée : Grammaire (B1)",
    cours_progress: "49%",
    cours_grade: "93%",
    total_lessons: 5,
    langue: "arabic",
  },
  {
    id: 214057,
    cours_name: "Leçons vidéos : Les sciences",
    cours_progress: "77%",
    cours_grade: "96%",
    total_lessons: 13,
    langue: "spanish",
  },
];

export default function CourseProgress({ language }) {
  const courses = language
    ? allCourses.filter((course) => course.langue === language)
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
                <span className="font-medium ">{course.cours_name}</span>
                <Badge
                  variant="outline"
                  className="text-primary border-red-400  text-red-400 rounded-[10rem]"
                >
                  {course.langue}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Progress: {course.cours_progress}</span>
                  <span>Lessons: {course.total_lessons}</span>
                </div>
                <Progress
                  value={parseInt(course.cours_progress)}
                  className="h-2 "
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm text-red-foreground">
                  <span>Grade: {course.cours_grade}</span>
                </div>
                <Progress
                  value={parseInt(course.cours_grade)}
                  className="h-2 "
                />
              </div>
            </div>
          ))}
        </div>
      
      </CardContent>
    </Card>
  );
}
