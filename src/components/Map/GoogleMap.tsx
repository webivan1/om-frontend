/// <reference path="../../definitions/gmap/markercluster.d.ts" />

import React, { FC } from "react";
import GoogleMapReact from "google-map-react";
// @ts-ignore
import MarkerClusterer from "@google/markerclusterer";
import { isString } from "../../guards";
import { computeBounds, isPointBetweenPoints } from "../../services/coords/coords";
import { useMap } from "./hookMap";
import { connectWebsocket } from "./websocket";

// Types
import {
  AttachEventsType,
  PointUserType,
  PropTypes
} from "./types";

export const Map: FC<PropTypes> = ({ event, onSetTotal }: PropTypes) => {

  const { region: { lat, lng } } = event;

  const [cluster, setCluster, socket] = useMap<IMarkerClusterer>(event, () => {
    attachEvents(
      event,
      socket,
      handlerAddMarkers,
      handlerRemoveMarkers,
      onSetTotal
    );
  });

  const loadedMap = (map: google.maps.Map) => {
    setCluster(new MarkerClusterer(map, [], {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }));
  };

  const handlerAddMarkers = (markers: google.maps.Marker[]) => {
    if (cluster) {
      cluster.addMarkers(markers, false);
    }
  }

  const handlerRemoveMarkers = (point: PointUserType) => {
    if (cluster) {
      cluster.getMarkers();

      const findMarker = cluster.getMarkers().find(item => item.get('id') === point.id);

      if (findMarker) {
        cluster.removeMarker(findMarker, false, false);
      }
    }
  }

  return (
    <div id="app-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: getApiKey() }}
        center={{ lat, lng }}
        defaultZoom={8}
        onGoogleApiLoaded={({ map }) => loadedMap(map)}
      />
    </div>
  )
};

const attachEvents: AttachEventsType<google.maps.Marker[]> = (event, socket, add, remove, setTotal) => {
  const { region: { lat, lng, distance } } = event;

  const borders = computeBounds({ lat, lng }, distance);

  const setConnection = (connections: PointUserType[]) => {
    const markers = connections.map(connection => createPoint(connection));
    add(markers);
  };

  const addPlacement = (connection: PointUserType) => {
    if (isPointBetweenPoints(connection, borders)) {
      const marker = createPoint(connection);
      add([marker]);
    }
  };

  const removePlacement = (connection: PointUserType) => {
    if (isPointBetweenPoints(connection, borders)) {
      remove(connection);
    }
  };

  connectWebsocket(
    socket,
    setConnection,
    addPlacement,
    removePlacement,
    setTotal
  );
}

const createPoint = ({ lat, lng, id }: PointUserType): google.maps.Marker => {
  const marker = new google.maps.Marker({
    position: {
      lat: Number(lat),
      lng: Number(lng)
    }
  });

  marker.set('id', id);

  return marker;
}

const getApiKey = (): string => {
  return isString(process.env.REACT_APP_MAP_API_KEY) ? process.env.REACT_APP_MAP_API_KEY : '';
}