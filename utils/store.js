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

  showUserDetailsModal: {
    show: false,
    id: "",
  },
  setShowUserDetailsModal: (showUserDetailsModal) =>
    set({ showUserDetailsModal }),
}));

export default useStore;
