import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  showCreateProductModal: {
    show: false,
    id: "",
    mode: "create",
    refresh: false,
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

  showOrderDetailsModal: {
    show: false,
    id: "",
  },
  setShowOrderDetailsModal: (showOrderDetailsModal) =>
    set({ showOrderDetailsModal }),
}));

export default useStore;
