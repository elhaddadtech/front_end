import { get } from "http";
import { create } from "zustand";

// Create a store for managing a counter
const useStore = create((set) => ({
  // Initial state
  students: [],
  getStudentData: async (email) => {
    console.log("getStudentData", email?.user?.email);

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    set({ students: data });

    // console.log("data", data);

    return data;
  },
}));

export default useStore;
