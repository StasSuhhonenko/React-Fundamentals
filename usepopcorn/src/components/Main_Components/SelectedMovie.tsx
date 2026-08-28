import { useEffect, useState, useRef } from "react";
import type {
  MovieDetails,
  OmdbDetailsResponse,
  WatchedMovie,
  WatchedMovies,
} from "../../types";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "../ErrorMessage";
import { useKeyboardKey } from "../../hooks/useKeyboardKey";

export default function SelectedMovie({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}: {
  selectedID: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovies;
}) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const KEY = "64ebe0ef";
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating],
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID,
  )?.userRating;

  function handleAdd() {
    if (!movie) return;

    onAddWatched({
      imdbID: selectedID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    });
    onCloseMovie();
  }
  const { Title: title }: Partial<MovieDetails> = movie ?? {};

  useKeyboardKey("escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`,
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching the movie");
          const data: OmdbDetailsResponse = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (err) {
          let message = "Unknown Error";
          if (err instanceof Error) message = err.message;
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovie();
    },
    [KEY, selectedID],
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title],
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && movie && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to the watched list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You've already rated this movie! - {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
