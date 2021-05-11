import { createContext } from "react";

interface defaultObjectInterface {
  file: File;
  setFile: React.Dispatch<File>;
}

export const defaultObject: defaultObjectInterface = {
  file: null,
  setFile: null,
};

export const AppContext = createContext(defaultObject);
