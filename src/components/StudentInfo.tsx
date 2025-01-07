import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const student = {
  id: 'G13456786',
  apogee: "12091", // Added the missing comma here
  name: 'Elhaddad Abdelmounaim',
  level: 'B1',
  totalTime: '15:18:08',
  scoreTest1: '199/400',
};

export default function StudentInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Full Name:</strong> {student.name}</p>
            <p><strong>CNE:</strong> {student.id}</p>
            <p><strong>Apogee:</strong> {student.apogee}</p>
            <p><strong>Level:</strong> {student.level}</p>
          </div>
          <div>
            <p><strong>Total Time:</strong> {student.totalTime}</p>
            <p><strong>Test 1 Score:</strong> {student.scoreTest1}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
