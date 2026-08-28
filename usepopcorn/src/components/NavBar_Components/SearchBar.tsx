import { useRef } from "react";
import { useKeyboardKey } from "../../hooks/useKeyboardKey";

export default function SearchBar({
  query,
  onSetQuery,
  onSearch,
  onSetSubmittedQuery,
}: {
  query: string;
  onSetQuery: (query: string) => void;
  onSearch: (submittedQuery: string) => void;
  onSetSubmittedQuery: (T: string) => void;
}) {
  const inputEl = useRef<HTMLInputElement>(null);
  useKeyboardKey("Delete", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current!.focus();
    onSetSubmittedQuery("");
    onSetQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch(query);
      }}
      ref={inputEl}
    />
  );
}
