import { create } from "zustand";

export interface BlockStore {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  toggleEditing: () => void;
}

export const useBlockStore = create<BlockStore>((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}));
