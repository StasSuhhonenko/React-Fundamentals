import { useEffect, useState } from "react";
import NavBar from "./components/NavBar_Components/NavBar.tsx";
import Logo from "./components/NavBar_Components/Logo.tsx";
import SearchBar from "./components/NavBar_Components/SearchBar.tsx";
import NumResults from "./components/NavBar_Components/NumResults.tsx";
import Main from "./components/Main_Components/Main.tsx";
import Box from "./components/Main_Components/Box.tsx";
import MovieList from "./components/Main_Components/MovieList.tsx";
import WatchedStats from "./components/Main_Components/WatchedStats.tsx";
import WatchedList from "./components/Main_Components/WatchedList.tsx";
import Loader from "./components/Main_Components/Loader.tsx";
import ErrorMessage from "./components/ErrorMessage.tsx";
import SelectedMovie from "./components/Main_Components/SelectedMovie.tsx";
import type { WatchedMovie, WatchedMovies } from "./types.ts";
import { useMovies } from "./hooks/useMovies.ts";
import { useLocalStorageState } from "./hooks/useLocalStorageState.ts";

function App() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedID, setSelectedID] = useState<null | string>(null);

  const { movies, isLoading, error } = useMovies(submittedQuery);

  const [watched, setWatched] = useLocalStorageState<WatchedMovies>(
    [],
    "watched",
  );

  function handleMovieSelection(id: string) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  function handleSearch() {
    setSubmittedQuery(query);
  }

  // Derived during render instead of reset inside the effect: for a short query
  // there is nothing to show, regardless of what the last fetch left behind.
  const displayedMovies = submittedQuery.length < 3 ? [] : movies;
  const displayedError = submittedQuery.length < 3 ? "" : error;

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar
          query={query}
          onSetQuery={setQuery}
          onSearch={handleSearch}
          onSetSubmittedQuery={setSubmittedQuery}
        />
        <NumResults movies={displayedMovies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !displayedError && (
            <MovieList
              movies={displayedMovies}
              onMovieSelection={handleMovieSelection}
            />
          )}
          {displayedError && <ErrorMessage message={displayedError} />}
        </Box>
        <Box>
          {selectedID ? (
            <SelectedMovie
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedStats watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
