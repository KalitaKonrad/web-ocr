import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AppContext } from "../../appContext/appContext";
import { useStore } from "../../store/useStore";
import SidePropertyDescription from "@components/shared/SidePropertyDescription";
import SidePropertyValue from "@components/shared/SidePropertyValue";

interface PropertiesProps {}

const PropertiesComponent: React.FC<PropertiesProps> = () => {
  const { selectedPage } = useContext(AppContext);
  const pageData = useStore((state) => state.pagesData[selectedPage]);
  const numberOfPages = useStore((state) => state.numberOfPages);
  if (!pageData) {
    return null;
  }
  return (
    <Flex
      maxW="90%"
      flexDirection="column"
      alignItems="center"
      flex={1}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <SidePropertyDescription text="Liczba wszystkich stron:" />
      <SidePropertyValue text={`${numberOfPages}`} />

      <SidePropertyDescription text="Aktualna strona:" />
      <SidePropertyValue text={`${selectedPage}`} />

      <SidePropertyDescription text="Przybliżona wysokość strony:" />
      <SidePropertyValue text={`${pageData?.height / 72} cala`} />

      <SidePropertyDescription text="Przybliżona szerokość strony:" />
      <SidePropertyValue text={`${pageData?.width / 72} cala`} />

      <SidePropertyDescription text="Oszacowanie poprawności wyników na stronie:" />
      <SidePropertyValue text={`${pageData.confidence * 100}%`} />

      {pageData.property ? (
        <SidePropertyDescription text="Rozpoznane języki:" />
      ) : null}
    </Flex>
  );
};

export default PropertiesComponent;
