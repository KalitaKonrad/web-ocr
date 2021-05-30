import create from "zustand";
import { PageObject } from "../types/pageObject";

interface EditsStore {
  detectionEditsArray: string[];
  changeDetectionEdit: (page: number, edit: string) => void;
  numberOfPages: number;
  setNumberOfPages: (pageNumber: number) => void;
  pagesData: PageObject[];
  setPagesData: (index: number, pageData: PageObject) => void;
}

const editHelper = (page, edit, state) => {
  const newEditArray = [...state.detectionEditsArray];
  newEditArray[page] = edit;
  return newEditArray;
};

const pageDataHelper = (index, pageData, state) => {
  const newPagesArray = [...state.pagesData];
  newPagesArray[index] = pageData;
  console.log(newPagesArray);
  return newPagesArray;
};

export const useStore = create<EditsStore>((set) => ({
  detectionEditsArray: [],
  changeDetectionEdit: (page, edit) =>
    set((state) => ({ detectionEditsArray: editHelper(page, edit, state) })),
  numberOfPages: 0,
  setNumberOfPages: (pageNumber) => set({ numberOfPages: pageNumber }),
  pagesData: [],
  setPagesData: (index, pageData) =>
    set((state) => ({
      pagesData: pageDataHelper(index, pageData, state),
    })),
}));
