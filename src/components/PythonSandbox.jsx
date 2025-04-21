import { useState } from "react";
import { executePython } from "../services/api";

export default function PythonSandbox({ imageId, onDerived }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  async function run() {
    try {
      const { result_id } = await executePython(imageId, code);
      setMsg(`Sandbox result: ${result_id}`);
      onDerived(result_id);
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="card">
      {/*<h2>Python sandbox</h2>*/}
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="result = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)"
      />
      <button
        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        onClick={run}
      >
        Executar
      </button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
