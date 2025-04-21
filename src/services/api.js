const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {image_id, filename …}
}

export async function getStatus(id) {
  const res = await fetch(`${BASE_URL}/status/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {status: 'processing'|'complete', …}
}

export async function getHistory(id) {
  const url = id ? `${BASE_URL}/history/${id}` : `${BASE_URL}/history`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function applyOperation(imageId, operation, params = {}) {
  const res = await fetch(`${BASE_URL}/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: imageId, operation, params }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {result_id}
}

export async function executePython(imageId, code) {
  const res = await fetch(`${BASE_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: imageId, code }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {result_id}
}

export function tileUrl(imageId, z, x, y) {
  return `${BASE_URL}/tiles/${imageId}/${z}/${x}/${y}.png`;
}
