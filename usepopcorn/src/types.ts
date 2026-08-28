/**
 * A single result from the OMDb search endpoint (`?s=`).
 * Field names are PascalCase because that is what the API sends.
 */
export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type Movies = Movie[];

/** The OMDb detail endpoint (`?i=`) returns every search field plus these. */
export type MovieDetails = Movie & {
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};

/**
 * A movie the user has added to the watched list.
 *
 * This is our own shape, not the API's: `Runtime`/`imdbRating` arrive as
 * strings and are parsed to numbers on the way in, and `userRating` has no
 * API equivalent at all. Hence camelCase, to keep it distinct from `Movie`.
 */
export type WatchedMovie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
  countRatingDecisions: number;
};

export type WatchedMovies = WatchedMovie[];

/**
 * OMDb signals failure with HTTP 200 and `Response: "False"`, so the payload
 * is a union discriminated on that field rather than a single shape.
 */
export type OmdbSearchResponse =
  | { Response: "True"; Search: Movies; totalResults: string }
  | { Response: "False"; Error: string };

export type OmdbDetailsResponse =
  | ({ Response: "True" } & MovieDetails)
  | { Response: "False"; Error: string };
