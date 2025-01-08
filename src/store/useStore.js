import { create } from "zustand";

// Create a store for managing a counter
const useStore = create((set) => ({
  counter: 0,
  test: 12,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));

export default useStore;
