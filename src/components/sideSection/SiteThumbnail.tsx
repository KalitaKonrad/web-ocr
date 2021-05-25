import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { Page } from "react-pdf";
import { AppContext } from "src/appContext/appContext";

interface SiteThumbnailProps {
  pageNumber: number;
}

const SiteThumbnail: React.FC<SiteThumbnailProps> = ({ pageNumber }) => {
  const { selectedPage, setSelectedPage } = useContext(AppContext);

  const classes = `${pageNumber === selectedPage ? "selected " : ""} page`;

  return (
    <Box w="100%" padding="1em">
      <Page
        className={classes}
        onClick={() => setSelectedPage(pageNumber)}
        scale={0.2}
        renderTextLayer={false}
        pageNumber={pageNumber}
      />
    </Box>
  );
};

export default SiteThumbnail;
