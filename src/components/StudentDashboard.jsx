import StudentInfo from "./StudentInfo";
import CourseProgress from "./CourseProgress";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <StudentInfo />
      <CourseProgress />
    </div>
  );
}
