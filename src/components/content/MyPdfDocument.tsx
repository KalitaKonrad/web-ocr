import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useStore } from "../../store/useStore";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyPdfDocument: React.FC = () => {
  const detectionEditsArray = useStore((state) => state.detectionEditsArray);

  return (
    <Document>
      {detectionEditsArray.map((text, key) => {
        if (key === 0) return;
        return (
          <Page key={key} size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>{text}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default React.memo(MyPdfDocument);
