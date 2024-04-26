import { create } from "zustand";

interface authSubscriptionStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSubscriptionModal = create<authSubscriptionStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}));