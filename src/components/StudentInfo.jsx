"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useStore from "../store/useStore";

export default function StudentInfo() {
  const { students, status } = useStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Adjust grid layout for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Email:</strong> {students?.email}
            </p>
            <p>
              <strong>Full Name:</strong> {students?.full_name}
            </p>
            <p>
              <strong>CNE:</strong> {students?.cne?.toUpperCase()}
            </p>
            <p>
              <strong>Apogee:</strong> {students?.apogee}
            </p>
            <p>
              <strong>Institution:</strong> {students?.institution}
            </p>
          </div>
          <div>
            <p>
              <strong>Group:</strong> {students?.group}
            </p>
            <p>
              <strong>Branch:</strong> {students?.branch}
            </p>
            <p>
              <strong>Semester:</strong> {students?.semester}
            </p>
            <p>
              <strong>Birthdate:</strong> {students?.birthdate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
