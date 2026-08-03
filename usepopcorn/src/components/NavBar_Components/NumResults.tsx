import type { Movies } from "../../types";

export default function NumResults({ movies }: { movies: Movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
