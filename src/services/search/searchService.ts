import { NEXT_PUBLIC_API_BASE_URL } from "config/config";
import httpClient from "../httpClient";
export const getSearchResults = async ({ queryKey }: any) => {
  const [, query, filters] = queryKey;
  return httpClient
    .get(`${NEXT_PUBLIC_API_BASE_URL}/search?q=${query}&f=${filters}`)
    .then(({ data }) => data);
};
