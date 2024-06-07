import { NEXT_PUBLIC_API_BASE_URL } from "config/config";
import httpClient from "../httpClient";
export const getSearchResults = async ({ queryKey }: any) => {
  const [, query, filters] = queryKey;

  if (!query || !filters) {
    return {
      results: [],
      message: "Query or filters required",
      status: false,
    };
  }

  if (query.length < 3) {
    return {
      results: [],
      message: "",
      status: false,
    };
  }

  return httpClient
    .get(`${NEXT_PUBLIC_API_BASE_URL}/search?q=${query}&f=${filters}`)
    .then(({ data }) => data);
};
