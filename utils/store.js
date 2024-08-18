import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  showCreateProductModal: {
    show: false,
    id: "",
    mode: "create",
  },
  setShowCreateProductModal: (showCreateProductModal) =>
    set({ showCreateProductModal }),

  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
