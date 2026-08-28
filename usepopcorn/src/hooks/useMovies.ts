import { useState, useEffect } from "react";
import type { Movies, OmdbSearchResponse } from "../types";
export function useMovies(submittedQuery: string) {
  const [movies, setMovies] = useState<Movies>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "64ebe0ef";
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${submittedQuery}`,
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data: OmdbSearchResponse = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          let message = "Unknown Error";
          if (err instanceof Error) message = err.message;
          // reportError({ message });
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
      if (submittedQuery.length < 3) return;
      fetchMovies();
    },
    [submittedQuery],
  );
  return { movies, isLoading, error };
}
