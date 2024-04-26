import { create } from "zustand";

interface uploadModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useUploadModal = create<uploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}));