import { create } from "zustand";

interface AddProductDialogState {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useProductStore = create<AddProductDialogState>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
}));
