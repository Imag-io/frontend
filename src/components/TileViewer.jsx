import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { tileUrl } from "../services/api";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";

export default function TileViewer({ imageId }) {
  return (
    <div className="card">
      {/*<h2>Leaflet</h2>*/}

      <MapContainer
        id="map"
        center={[0, 0]}
        zoom={0}
        crs={L.CRS.Simple}
        minZoom={0}
        maxZoom={18}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url={tileUrl(imageId, "{z}", "{x}", "{y}")} />
        <SyncUrl />
      </MapContainer>
    </div>
  );
}

function SyncUrl() {
  const [search, setSearch] = useSearchParams();
  const map = useMapEvents({
    zoomend: updateUrl,
    moveend: updateUrl,
  });

  useEffect(() => {
    const z = Number(search.get("z"));
    const x = Number(search.get("x"));
    const y = Number(search.get("y"));
    if (Number.isFinite(z) && Number.isFinite(x) && Number.isFinite(y)) {
      map.setView([y, x], z);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  function updateUrl() {
    const z = map.getZoom();
    const center = map.getCenter(); // {lat, lng}
    const next = new URLSearchParams(search);
    next.set("z", z);
    next.set("x", Math.round(center.lng));
    next.set("y", Math.round(center.lat));
    setSearch(next, { replace: true }); // nao registrar no historico
  }

  return null;
}
