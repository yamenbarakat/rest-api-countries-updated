import { useNavigate, useParams } from "react-router-dom";

import styles from "./Countries.module.css";
import { useQuery } from "../custom-hooks/useQuery";

function handlecountriesOfRegion(countries, region) {
  if (!region) return countries;

  if (region === "All") {
    return countries;
  } else {
    return countries.filter((country) => country.region === region);
  }
}

function handleSearchedCountry(query, countriesOfRegion) {
  if (!query) return;

  return countriesOfRegion.filter((country) => {
    return country.name.common.toLowerCase().includes(query.toLowerCase());
  });
}

function Countries({ countries }) {
  const { savedRegion } = useParams();
  const { query } = useQuery();

  const countriesOfRegion = handlecountriesOfRegion(countries, savedRegion);

  const searchedCountry = handleSearchedCountry(query, countriesOfRegion);

  const countriesResult = query ? searchedCountry : countriesOfRegion;

  return (
    <section className={styles.countries}>
      <div className={`container ${styles.container}`}>
        {countriesResult.length === 0 ? (
          <p className={styles.noResult}>No Results Found</p>
        ) : (
          countriesResult.map((country) => (
            <Country country={country} key={country.name.common} />
          ))
        )}
      </div>
    </section>
  );
}

function Country({ country }) {
  const navigate = useNavigate();

  function handleSelectedCountry() {
    navigate(`country/${country.name.common}`);
  }

  return (
    <div className={styles.country} onClick={handleSelectedCountry}>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <div className={styles.details}>
        <h2>{country.name.common}</h2>
        <ul>
          <li>
            <span>Population:</span>{" "}
            <span>{country.population.toLocaleString()}</span>
          </li>
          <li>
            <span>Region:</span> <span>{country.region}</span>
          </li>
          <li>
            <span>Capital:</span> <span>{country.capital}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Countries;
