import { createContext, useState } from "react";

const SearchQuery = createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  return (
    <SearchQuery.Provider value={{ query, setQuery }}>
      {children}
    </SearchQuery.Provider>
  );
}

export { SearchQuery, SearchProvider };
