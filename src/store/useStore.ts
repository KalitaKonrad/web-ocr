import create from "zustand";

interface EditsStore {
  detectionEditsArray: string[];
  changeDetectionEdit: (page: number, edit: string) => void;
}

const editHelper = (page, edit, state) => {
  console.log("state", state);

  const newEditArray = [...state.detectionEditsArray];
  newEditArray[page] = edit;
  console.log("newArray", newEditArray);
  return newEditArray;
};

export const useStore = create<EditsStore>((set) => ({
  detectionEditsArray: [],
  changeDetectionEdit: (page, edit) =>
    set((state) => ({ detectionEditsArray: editHelper(page, edit, state) })),
}));
