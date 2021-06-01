import { ThemeOverride } from "@chakra-ui/react";

type GlobalStyles = Pick<ThemeOverride, "styles">;

export default {
  styles: {
    global: {
      body: {
        overflow: "hidden",
      },
      h1: {
        fontWeight: 500,
        marginBottom: "0.5em",
      },
      p: {
        marginBottom: "1em",
      },
    },
  },
} as GlobalStyles;
