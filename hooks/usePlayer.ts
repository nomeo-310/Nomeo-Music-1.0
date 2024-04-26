import { create } from "zustand";

interface usePlayerStore {
  ids: string[]
  activeId?: string
  setId: (id: string) => void
  setIds: (id: string[]) => void
  reset: () => void
}

export const usePlayer = create<usePlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({activeId: id}),
  setIds: (ids: string[]) => set({ids: ids}),
  reset: () => set({activeId: undefined, ids: []})
}));