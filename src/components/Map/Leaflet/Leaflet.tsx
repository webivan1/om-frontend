import React, { createRef, FC, useEffect, useState } from "react";
import L from "leaflet";

// Styles
import "leaflet/dist/leaflet.css";
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export type LeafletPropTypes = {
  id: string;
  onLoaded(map: L.Map): void;
  options: L.MapOptions & {
    center: [number, number],
    zoom: number;
  };
}

export const Leaflet: FC<LeafletPropTypes> = (props: LeafletPropTypes) => {

  const mapRef = createRef<HTMLDivElement>();
  const [map, setMap] = useState<L.Map|undefined>(undefined);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current, props.options);

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '© OpenStreetMap contributors' }
      ).addTo(map);

      setMap(map);

      props.onLoaded(map);
    }
  }, [1]);

  useEffect(() => {
    if (map) {
      map.setView(
        props.options.center,
        props.options.zoom
      );
    }
  }, [props.options]);

  return (
    <div id={props.id}>
      <div ref={mapRef} />
    </div>
  )
}