import { useState } from "react";
import NavBar from "./components/NavBar_Components/NavBar.tsx";
import Logo from "./components/NavBar_Components/Logo.tsx";
import SearchBar from "./components/NavBar_Components/SearchBar.tsx";
import NumResults from "./components/NavBar_Components/NumResults.tsx";
import Main from "./components/Main_Components/Main.tsx";
import Box from "./components/Main_Components/Box.tsx";
import MovieList from "./components/Main_Components/MovieList.tsx";
import WatchedStats from "./components/Main_Components/WatchedStats.tsx";
import WatchedList from "./components/Main_Components/WatchedList.tsx";
import { tempMovieData, tempWatchedData } from "./data.ts";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedStats watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
