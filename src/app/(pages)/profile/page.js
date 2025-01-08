import StudentInfo from "../../../components/StudentInfo";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
        Student Profile
      </h1>
      <StudentInfo />
    </div>
  );
}
