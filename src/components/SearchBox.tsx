import { useEffect, useRef, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
  initial?: string;
  loading?: boolean;
};

export default function SearchBox({
  onSearch,
  placeholder = "Search GitHub users...",
  initial = "",
  loading = false,
}: Props) {
  const [value, setValue] = useState(initial);
  const last = useRef(0);

  useEffect(() => {
    const now = Date.now();
    last.current = now;
    const id = setTimeout(() => {
      if (last.current === now) onSearch(value);
    }, 400);
    return () => clearTimeout(id);
  }, [value, onSearch]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch(value);
    }
  }

  function clearInput() {
    setValue("");
    onSearch("");
  }

  return (
    <div className="search" role="search" style={{ position: "relative" }}>
      <input
        aria-label="Search GitHub users"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{ paddingRight: value ? "2.5rem" : undefined }}
      />
      {value && (
        <button
          type="button"
          onClick={clearInput}
          style={{
            position: "absolute",
            right: "90px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#9fb0c0",
            fontSize: "18px",
          }}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button onClick={() => onSearch(value)} disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
    </div>
  );
}
