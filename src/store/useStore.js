import axiosConfig from "../lib/axiosConfig";
import { create } from "zustand";
// Create a store for managing a counter
const useStore = create((set) => ({
  // Initial state
  status: false,
  languages: [],
  allCourses: [],
  students: [],
  getStudentData: async (email) => {
    // console.log("getStudentData", email?.user?.email);
    try {
      const data = await axiosConfig.post("/search/user", {
        email: email,
      });
      // Extract the 'languages' object directly
      const languages = data?.result?.languages || {};
      let allCourses = []; // Initialize allCourses array

      // Map over the languages and format them
      const formattedLanguages = Object.keys(languages).map((langCode) => {
        const lang = languages[langCode][0]; // Access the first object (in case there are multiple items)

        // Map over the courses of each language and add the language code to each course
        const coursesWithLang =
          lang.courses?.map((course) => ({
            ...course,
            language: langCode, // Add the language code to each course
          })) || [];

        // Add the courses of this language to the allCourses array
        allCourses = [...allCourses, ...coursesWithLang];

        return {
          code: langCode, // "french", "english", etc.
          name: langCode.charAt(0).toUpperCase() + langCode.slice(1), // Capitalize the language name
          coursesCount: lang.courses?.length || 0, // Count of courses (fallback to 0 if undefined)
          level: lang.level_test_1 || "N/A", // Use level_test_1, fallback to "N/A"
          score_test_1: lang.score_test_1 || "N/A", // Use score_test_1, fallback to "N/A"
          total_time: lang.total_time || "N/A", // Use total_time, fallback to "N/A"
        };
      });

      // console.log("Formatted Languages:", formattedLanguages);
      // console.log("All Courses with Language:", allCourses);

      set({
        languages: formattedLanguages,
        students: data.result,
        status: data.status,
        allCourses: allCourses,
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default useStore;
