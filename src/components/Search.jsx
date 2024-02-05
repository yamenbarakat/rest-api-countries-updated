import { useQuery } from "../custom-hooks/useQuery";
import styles from "./Search.module.css";

export default function Search() {
  const { query, setQuery } = useQuery();
  return (
    <div className={styles.search}>
      <input
        type="text"
        name="search"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
