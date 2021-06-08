import create from "zustand";
import { PageObject } from "../types/pageObject";

interface EditsStore {
  detectionEditsArray: string[];
  changeDetectionEdit: (page: number, edit: string) => void;
  numberOfPages: number;
  setNumberOfPages: (pageNumber: number) => void;
  pagesData: PageObject[];
  setPagesData: (index: number, pageData: PageObject) => void;
  isDetectionLoading: boolean;
  setIsDetectionLoading: (value: boolean) => void;
  cleanDetectionEdit: () => void;
}

const editHelper = (page: number, edit: string, state: EditsStore) => {
  const newEditArray = [...state.detectionEditsArray];
  newEditArray[page] = edit;
  return newEditArray;
};

const pageDataHelper = (index, pageData, state) => {
  const newPagesArray = [...state.pagesData];
  newPagesArray[index] = pageData;
  return newPagesArray;
};

export const useStore = create<EditsStore>((set) => ({
  detectionEditsArray: [],
  changeDetectionEdit: (page, edit) =>
    set((state) => ({ detectionEditsArray: editHelper(page, edit, state) })),
  cleanDetectionEdit: () => set(() => ({ detectionEditsArray: [] })),
  numberOfPages: 0,
  setNumberOfPages: (pageNumber) => set({ numberOfPages: pageNumber }),
  pagesData: [],
  setPagesData: (index, pageData) =>
    set((state) => ({
      pagesData: pageDataHelper(index, pageData, state),
    })),
  isDetectionLoading: false,
  setIsDetectionLoading: (value) => set(() => ({ isDetectionLoading: value })),
}));
