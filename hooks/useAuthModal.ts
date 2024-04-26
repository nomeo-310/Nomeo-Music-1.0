import { create } from "zustand";

interface authModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAuthModal = create<authModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}));