import CourseList from "../../../components/CourseList";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
      <CourseList />
    </div>
  );
}
