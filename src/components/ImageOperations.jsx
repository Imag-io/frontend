import { useState } from "react";
import { applyOperation } from "../services/api";

const OPS = [
  { label: "Grayscale", value: "grayscale" },
  { label: "Blur", value: "blur" },
  { label: "Edge detection", value: "edge_detection" },
  { label: "Threshold", value: "threshold" },
  { label: "Histogram equalisation", value: "histogram_equalization" },
];

export default function ImageOperations({ imageId, onDerived }) {
  const [msg, setMsg] = useState("");
  const [busyOp, setBusyOp] = useState(null);

  async function run(op) {
    if (!op) return;
    setBusyOp(op);
    setMsg("");
    try {
      const { result_id } = await applyOperation(imageId, op);
      setMsg(`Sucesso: Imagem criada: ${result_id}`);
      onDerived(result_id);
    } catch (e) {
      setMsg(`Erro: ${e.message}`);
    } finally {
      setBusyOp(null);
    }
  }

  return (
    <div className="card">
      {/*<h2>Operações</h2>*/}

      <div
        className="op-buttons"
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        {OPS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => run(value)}
            disabled={busyOp === value}
            style={{
              padding: "0.4rem 0.8rem",
              border: "1px solid #888",
              borderRadius: 6,
              background: busyOp === value ? "#ccc" : "#f5f5f5",
            }}
          >
            {busyOp === value ? "Resolvendo…" : label}
          </button>
        ))}
      </div>

      {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
    </div>
  );
}
