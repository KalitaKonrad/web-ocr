export interface DetectionResponse {
  data: Data[];
}

interface Data {
  fullTextAnnotation: {
    text: string;
  };
}
