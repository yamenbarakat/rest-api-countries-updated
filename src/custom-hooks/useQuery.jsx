import { useContext } from "react";
import { SearchQuery } from "../context/SearchQuery";

function useQuery() {
  const context = useContext(SearchQuery);
  return context;
}

export { useQuery };
