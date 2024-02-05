// js files
import Header from "./components/Header";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

import Filter from "./components/Filter";
import Search from "./components/Search";
import Loader from "./components/Loader";
import Error from "./components/Error";

import { useCountries } from "./custom-hooks/useCountries";
import { useLocalStorageTheme } from "./custom-hooks/useLocalStorageTheme";
import { Route, Routes } from "react-router-dom";
import { SearchProvider } from "./context/SearchQuery";

export default function App() {
  // custom hooks
  const [countries, status] = useCountries();
  const [setMode] = useLocalStorageTheme();

  return (
    <>
      {status === "loading" && <Loader />}

      {status === "error" && <Error />}

      {status === "ready" && (
        <Main>
          <Header onSetMode={setMode} />

          <SearchProvider>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <>
                    <NavBar>
                      <Search />
                      <Filter />
                    </NavBar>
                    <Countries countries={countries} />
                  </>
                }
              />

              <Route
                index
                path="region/:savedRegion"
                element={
                  <>
                    <NavBar>
                      <Search />
                      <Filter />
                    </NavBar>
                    <Countries countries={countries} />
                  </>
                }
              />

              <Route
                path="/region/:savedRegion/country/:country"
                element={<CountryDetails countries={countries} />}
              />

              <Route
                path="/country/:country"
                element={<CountryDetails countries={countries} />}
              />
            </Routes>
          </SearchProvider>
        </Main>
      )}
    </>
  );
}
