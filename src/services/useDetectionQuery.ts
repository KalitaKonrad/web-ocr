import axios from "axios";
import { useQuery } from "react-query";
import { DetectionResponse } from "../types/detectionResponse";
import { QUERY_DETECTION_KEY } from "../const/query.const";

export const useDetectionQuery = (fileName: string) => {
  return useQuery<DetectionResponse>(
    QUERY_DETECTION_KEY,
    async () => {
      const response = await axios.get(
        `http://localhost:3000/api/getOcr/${fileName}`,
      );
      console.log("AXIOS response");
      return response.data;
    },
    {
      enabled: false,
    },
  );
};