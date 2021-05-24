import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AppContext } from "../../appContext/appContext";
import { useStore } from "../../store/useStore";
import SidePropertyDescription from "@components/shared/SidePropertyDescription";
import SidePropertyValue from "@components/shared/SidePropertyValue";

interface PropertiesProps {}

const PropertiesComponent: React.FC<PropertiesProps> = () => {
  const { selectedPage } = useContext(AppContext);
  const pageData = useStore((state) => state.pagesData[selectedPage]);
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
      <SidePropertyDescription text="Przybliżona wysokość strony" />
      <SidePropertyValue text={`${pageData?.height / 72} cala`} />

      <SidePropertyDescription text="Przybliżona szerokość strony" />
      <SidePropertyValue text={`${pageData?.width / 72} cala`} />

      <SidePropertyDescription text="Oszacowanie poprawności wyników" />
      <SidePropertyValue text={`${pageData.confidence * 100}%`} />
    </Flex>
  );
};

export default PropertiesComponent;
