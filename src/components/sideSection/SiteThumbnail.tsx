import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Page } from "react-pdf";

interface SiteThumbnailProps {
  pageNumber: number;
}

const SiteThumbnail: React.FC<SiteThumbnailProps> = ({ pageNumber }) => {
  return (
    <Box w="100%" marginBottom="1em">
      <Page scale={0.2} renderTextLayer={false} pageNumber={pageNumber} />
    </Box>
  );
};

export default SiteThumbnail;
