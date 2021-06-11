import create from "zustand";
import { PageObject } from "../types/pageObject";

export interface ResponseObj {
  fullTextAnnotation: {
    pages: Array<{
      blocks: Array<{
        paragraphs: Array<{
          boundingBox: {
            normalizedVertices: Array<{ x: number; y: number }>;
          };
        }>;
      }>;
      height: number;
      width: number;
    }>;
    text: string;
  };
  context: {
    uri: string;
    pageNumber: number;
  };
}

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
  selectedText: string;
  setSelectedText: (text: string) => void;
  responses: ResponseObj[];
  setResponses: (index: number, response: ResponseObj) => void;
  cleanResponsesArray: () => void;
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

const responseDataHelper = (
  index: number,
  response: ResponseObj,
  state: EditsStore,
) => {
  const newResponsesArray = [...state.responses];
  newResponsesArray[index] = response;
  return newResponsesArray;
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
  selectedText: "",
  setSelectedText: (text) => set(() => ({ selectedText: text })),
  responses: [],
  setResponses: (index, respones) =>
    set((state) => ({ responses: responseDataHelper(index, respones, state) })),
  cleanResponsesArray: () => set(() => ({ responses: [] })),
}));
