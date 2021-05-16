import create from "zustand";

interface EditsStore {
  detectionEditsArray: string[];
  changeDetectionEdit(page: number, edit: string): void;
}

const editHelper = (page, edit, state) => {
  const newEditArray = [...state.detectionEditsArray];
  newEditArray[page] = edit;
  return newEditArray;
};

export const useStore = create<EditsStore>((set) => ({
  detectionEditsArray: [],
  changeDetectionEdit: (page, edit) =>
    set((state) => ({ detectionEditsArray: editHelper(page, edit, state) })),
}));
