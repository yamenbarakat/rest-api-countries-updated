import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Filter.module.css";
import { useQuery } from "../custom-hooks/useQuery";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const { setQuery } = useQuery();

  const { savedRegion } = useParams();

  const navigate = useNavigate();

  function handleSetRegion(el) {
    setQuery("");

    navigate(`/region/${el}`);

    setIsOpen(false);
  }

  useEffect(() => {
    function toggleMenu(e) {
      if (e.target.matches(".dropdown")) {
        setIsOpen((open) => !open);
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener("click", toggleMenu);

    return () => document.removeEventListener("click", toggleMenu);
  }, [isOpen]);

  return (
    <div className={styles.filter}>
      <button className={`dropdown ${styles.dropdown}`}>
        {savedRegion ? savedRegion : "Filter by Region"}
      </button>

      {isOpen && (
        <ul onClick={(e) => handleSetRegion(e.target.textContent)}>
          <li>All</li>
          <li>Africa</li>
          <li>Americas</li>
          <li>Asia</li>
          <li>Europe</li>
          <li>Oceania</li>
        </ul>
      )}
    </div>
  );
}
