import React, { createContext } from "react";

interface defaultObjectInterface {
  file: File;
  setFile: React.Dispatch<File>;
  selectedPage: number;
  setSelectedPage: React.Dispatch<number>;
  ocrCompleted: boolean;
  setOcrCompleted: (value: boolean) => void;
}

export const defaultObject: defaultObjectInterface = {
  file: null,
  setFile: null,
  selectedPage: null,
  setSelectedPage: null,
  ocrCompleted: null,
  setOcrCompleted: null,
};

export const AppContext = createContext(defaultObject);
