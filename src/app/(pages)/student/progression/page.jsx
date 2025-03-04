"use client";
import ExamResults from "../../../../components/ExamResults";

export default function ProgressionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
        Student Progression
      </h1>
      <ExamResults />
    </div>
  );
}
