import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "./CountryDetails.module.css";
import { useQuery } from "../custom-hooks/useQuery";

export default function CountryDetails({ countries }) {
  const navigate = useNavigate();

  const { setQuery } = useQuery();

  function handleSelectedCountry(name) {
    return countries.find((country) => country.name.common === name);
  }

  const { country, savedRegion } = useParams();

  const selectedCountry = handleSelectedCountry(country);

  const {
    flags,
    name: { common: name },
    name: { nativeName },
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = selectedCountry;

  const bordersOfCountry = borders
    ?.map((country) => {
      return countries.find((code) => code.cca3 === country);
    })
    .map((country) => country.name.common);

  function handleArrayLangs(array) {
    return array.reduce((acc, el, i, arr) => {
      if (arr.length === 1 || i === 0) return el;

      if (arr.length !== i + 1) {
        acc += ", ";
      } else {
        acc += " and ";
      }

      return (acc += el);
    }, "");
  }

  function handleBack() {
    setQuery("");
    navigate(-1);
  }

  // set some styles dynamically
  const bordersContainer = useRef();
  const borderLinks = useRef();

  useEffect(() => {
    const Links = borderLinks.current.children;

    // change grid values based on the number of buttons
    if (Links.length > 4) {
      bordersContainer.current.style.gridTemplateColumns = "none";
    } else {
      bordersContainer.current.style.gridTemplateColumns = "auto 1fr";
    }

    const LinksArray = Array.from(Links);

    //Find the maximum width among all buttons elements
    const maxWidth = Math.max(...LinksArray.map((child) => child.clientWidth));

    // Set the width of all child elements to the biggest width
    LinksArray.forEach((child) => {
      child.style.width = `${maxWidth}px`;
    });
  }, [borders]);

  return (
    <div className={styles.countryDetails}>
      <div className="container">
        <button className={styles.back} onClick={handleBack}>
          <i className="fa-solid fa-arrow-left-long"></i> Back
        </button>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <img src={flags.svg} alt={`${flags.alt}`} />
          </div>
          <div className={styles.details}>
            <h2>{name}</h2>
            <div className={styles.info}>
              <ul>
                <li>
                  <span>native name: </span>
                  <span>{Object.values(nativeName)[0].official}</span>
                </li>
                <li>
                  <span>population: </span>
                  <span>{population.toLocaleString()}</span>
                </li>
                <li>
                  <span>region: </span>
                  <span>{region}</span>
                </li>
                <li>
                  <span>sub region: </span>
                  <span>{subregion}</span>
                </li>
                <li>
                  <span>capital: </span>
                  <span>{capital}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>top level domain: </span>{" "}
                  <span>{tld ? tld[0] : "None"}</span>
                </li>
                <li>
                  <span>currencies: </span>
                  <span>{Object.values(currencies)[0].name}</span>
                </li>
                <li>
                  <span>languages: </span>
                  <span>
                    {handleArrayLangs(Array.from(Object.values(languages)))}
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.bordersContainer} ref={bordersContainer}>
              <p>Border Countries:</p>
              <div className={styles.borders} ref={borderLinks}>
                {bordersOfCountry
                  ? bordersOfCountry.map((countryName) => (
                      <Link
                        to={
                          savedRegion
                            ? `/region/${savedRegion}/country/${countryName}`
                            : `/country/${countryName}`
                        }
                        key={countryName}
                      >
                        {countryName}
                      </Link>
                    ))
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
