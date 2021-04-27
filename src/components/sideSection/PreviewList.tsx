import React from "react";
import { Flex } from "@chakra-ui/react";
import SiteThumbnail from "@components/sideSection/SiteThumbnail";

const sitesListMock = [
  { id: 12 },
  { id: 15 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
  { id: 21 },
];

interface PreviewListProps {
  sitesList?: string;
}

const PreviewList: React.FC<PreviewListProps> = ({ sitesList }) => (
  <Flex
    flexDirection={"column"}
    alignItems={"center"}
    flex={1}
    overflowY={"scroll"}
    css={{
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }}
  >
    {sitesListMock.map((item) => (
      <SiteThumbnail key={item.id} />
    ))}
  </Flex>
);

export default PreviewList;
