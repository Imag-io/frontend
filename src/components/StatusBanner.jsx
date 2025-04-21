import useInterval from "../hooks/useInterval";
import { getStatus } from "../services/api";
import { useEffect, useState } from "react";

export default function StatusBanner({ imageId }) {
  const [status, setStatus] = useState(null);

  async function poll() {
    try {
      const s = await getStatus(imageId);
      setStatus(s.status);
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    poll();
  }, [imageId]);
  useInterval(poll, status === "processing" ? 1500 : null);

  if (!status) return null;
  if (status === "processing")
    return <p className="bg-amber-300 p-2 rounded">Gerando mosaico</p>;
  if (status === "error")
    return <p className="bg-red-500 p-2 rounded">Sem status disponivel</p>;
  return <p className="bg-green-500 text-white p-2 rounded">Mosaico gerado</p>;
}
