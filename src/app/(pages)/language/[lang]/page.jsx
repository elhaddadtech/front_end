import { notFound } from "next/navigation";
import CourseProgress from "../../../../components/CourseProgress";

const languages = ["french", "english", "arabic", "spanish"];

export default function LanguageDetails({ params }) {
  if (!languages.includes(params.lang)) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 capitalize ">
        {params.lang}
      </h1>
      <CourseProgress language={params.lang} />
      {/* <PerformanceCharts /> */}
    </div>
  );
}
