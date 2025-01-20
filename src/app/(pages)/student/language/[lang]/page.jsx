// src/app/language/[lang]/page.jsx
import { notFound } from "next/navigation";
import CourseProgress from "../../../../../components/CourseProgress";

// List of supported languages
const languages = ["french", "english", "arabic", "spanish"];

// Make the component async
export default async function LanguageDetails({ params }) {
  const { lang } = await params;

  // Ensure the language exists in the list, else return a 404
  if (!languages.includes(lang)) {
    notFound();
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 capitalize ">
        {lang}
      </h1>
      <CourseProgress language={lang} />
    </div>
  );
}
