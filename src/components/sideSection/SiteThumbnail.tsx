import React from "react";
import { Box } from "@chakra-ui/react";

interface SiteThumbnailProps {
  image?: string;
}

const SiteThumbnail: React.FC<SiteThumbnailProps> = ({ image }) => (
  <Box flexShrink={0} h={170} w={40} m={5} bgColor={"gray.200"} />
);

export default SiteThumbnail;
