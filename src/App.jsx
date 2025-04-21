import { useState } from "react";
import UploadForm from "./components/UploadForm";
import StatusBanner from "./components/StatusBanner";
import ImageOperations from "./components/ImageOperations";
import PythonSandbox from "./components/PythonSandbox";
import TileViewer from "./components/TileViewer";
import HistoryList from "./components/HistoryList";

export default function App() {
  const [currentId, setCurrentId] = useState(null);

  return (
    <div className="app-wrapper">
      {}
      <aside className="sidebar">
        <h1 className="text-red-900, text-center text-2xl font-bold">
          Frontend buxa
        </h1>

        <UploadForm onSuccess={setCurrentId} />

        {currentId && (
          <ImageOperations imageId={currentId} onDerived={setCurrentId} />
        )}

        <HistoryList onSelect={setCurrentId} />
      </aside>

      <main className="canvas">
        {currentId ? (
          <>
            <StatusBanner imageId={currentId} />
            <TileViewer imageId={currentId} />
            <PythonSandbox imageId={currentId} onDerived={setCurrentId} />
          </>
        ) : (
          <p style={{ marginTop: "2rem" }}>Adicione uma imagem no Dropzone</p>
        )}
      </main>
    </div>
  );
}
