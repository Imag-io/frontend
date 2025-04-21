import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

const btn = {
  width: "100%",
  textAlign: "left",
  padding: "0.55rem 0.8rem",
  border: "1px solid #aaa",
  borderRadius: 6,
  background: "#f8f8f8",
  cursor: "pointer",
};
const pretty = (op) =>
  !op || op === "original"
    ? "Original"
    : op.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default function HistoryList({ onSelect }) {
  const [rootId, setRoot] = useState(null); // null = gallery
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchOnce() {
      try {
        const data = await getHistory(rootId);
        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    }
    fetchOnce(); // initial
    const id = setInterval(fetchOnce, 2000); // poll

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [rootId]);

  return (
    <div className="card">
      <h2 className="text-center text-2xl font-bold">
        {rootId ? "Histórico" : "Todas Imagens"}
      </h2>

      {rootId && (
        <button onClick={() => setRoot(null)} style={{ marginBottom: 8 }}>
          .
        </button>
      )}

      {err && <p style={{ color: "red" }}>{err}</p>}

      <div
        style={{
          maxHeight: 240,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          paddingTop: "1rem",
        }}
      >
        {items.map((it) => (
          <button
            key={it.image_id}
            style={btn}
            onClick={() => {
              if (!rootId && it.operation === "original") setRoot(it.image_id);
              onSelect(it.image_id);
            }}
          >
            <strong>{pretty(it.operation)}</strong>
            <br />
            <small>
              {it.image_id.slice(0, 8)}…{it.image_id.slice(-4)}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}
