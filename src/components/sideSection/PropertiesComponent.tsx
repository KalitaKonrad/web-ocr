import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AppContext } from "../../appContext/appContext";
import { useStore } from "../../store/useStore";
import SidePropertyDescription from "@components/shared/SidePropertyDescription";
import SidePropertyValue from "@components/shared/SidePropertyValue";

const PropertiesComponent: React.FC = () => {
  const { selectedPage } = useContext(AppContext);
  const pageData = useStore((state) => state.pagesData[selectedPage]);
  const numberOfPages = useStore((state) => state.numberOfPages);

  const renderLanguages = () => {
    if (!pageData.property)
      return <SidePropertyValue text="Nie wykryto języków dla tej strony" />;
    return pageData.property.detectedLanguages.map((item) => (
      <SidePropertyValue
        marginBottom={1}
        text={`${item.languageCode} z pewnością ${roundNumber(
          item.confidence * 100,
        )}%`}
      />
    ));
  };

  const roundNumber = (value) => {
    return Number(value.toFixed(2));
  };

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
      <SidePropertyValue text={`${roundNumber(pageData?.height / 72)} cala`} />

      <SidePropertyDescription text="Przybliżona szerokość strony:" />
      <SidePropertyValue text={`${roundNumber(pageData?.width / 72)} cala`} />

      <SidePropertyDescription text="Rozpoznane języki:" />
      {renderLanguages()}
    </Flex>
  );
};

export default PropertiesComponent;
