import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";
import { cn } from "@/lib/utils.ts";

export default function UploadForm({ onSuccess }) {
  const [err, setErr] = useState("");
  const [isUploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles?.length) return;
      const file = acceptedFiles[0];
      setErr("");
      setUploading(true);
      try {
        const { image_id } = await uploadFile(file);
        onSuccess(image_id);
      } catch (e) {
        setErr(e.message);
      } finally {
        setUploading(false);
      }
    },
    [onSuccess],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] }, // any image MIME
    maxFiles: 1,
    onDrop,
  });

  return (
    <div className="card">
      {/*<h2>Upload de imagem</h2>*/}

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #888",
          borderRadius: 8,
          padding: "2.5rem 1rem",
          textAlign: "center",
          background: isDragActive ? "#f0f8ff" : "#fafafa",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        <input {...getInputProps()} />
        {isUploading
          ? "Uploading…"
          : isDragActive
            ? "Drop the file here"
            : "Clique ou solte uma imagem para fazer upload"}
      </div>

      {err && <p style={{ color: "red", marginTop: 8 }}>{err}</p>}
    </div>
  );
}
