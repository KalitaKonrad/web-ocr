import React, { createContext } from "react";

interface defaultObjectInterface {
  file: File;
  setFile: React.Dispatch<File>;
  selectedPage: number;
  setSelectedPage: React.Dispatch<number>;
}

export const defaultObject: defaultObjectInterface = {
  file: null,
  setFile: null,
  selectedPage: null,
  setSelectedPage: null,
};

export const AppContext = createContext(defaultObject);
