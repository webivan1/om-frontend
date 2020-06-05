/// <reference path="../../definitions/ymaps/index.d.ts" />

import React, { FC } from "react";
import { computeBounds } from "../../services/coords/coords";
import { useMap } from "./hookMap";
import { connectWebsocket } from "./websocket";

// Types
import {
  AttachEventsType,
  PointUserType,
  PropTypes
} from "./types";

// Yandex map
import { YmapsProvider, Ymaps } from "./Ymaps";

type MarkerType = ymaps.ObjectManagerFeatureType | ymaps.ObjectManagerCollectionType;

export const Map: FC<PropTypes> = ({ event, onSetTotal }: PropTypes) => {

  const { region: { lat, lng } } = event;

  const [objectManager, setObjectManager, socket] = useMap<ymaps.ObjectManager>(event, () => {
    attachEvents(
      event,
      socket,
      handlerAddMarkers,
      handlerRemoveMarker,
      onSetTotal
    );
  });

  const handlerAddMarkers = (marker: MarkerType) => {
    if (objectManager) {
      objectManager.add(marker);
    }
  };

  const handlerRemoveMarker = (point: PointUserType) => {
    if (objectManager) {
      objectManager.remove([point.id]);
    }
  }

  const handlerLoadMap = (map: ymaps.Map) => {
    const manager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 360
    });

    map.geoObjects.add(manager);

    setObjectManager(manager);
  };

  return (
    <YmapsProvider>
      <Ymaps
        id="app-map"
        center={[lat, lng]}
        zoom={8}
        onLoadedMap={handlerLoadMap}
        onChangeMap={(map: ymaps.Map) => {}}
      />
    </YmapsProvider>
  )
};

const attachEvents: AttachEventsType<MarkerType> = (event, socket, add, remove, onSetTotal) => {
  const { region: { lat, lng, distance } } = event;

  const borders = computeBounds({ lat, lng }, distance);

  const setConnection = (points: PointUserType[]) => {
    const objectData: ymaps.ObjectManagerCollectionType = {
      type: 'FeatureCollection',
      features: []
    };

    points.forEach(point => {
      objectData.features.push(createPoint(point));
    });

    add(objectData);
  };

  const addPlacement = (point: PointUserType) => {
    add(createPoint(point));
  };

  const removePlacement = (point: PointUserType) => {
    remove(point);
  };

  connectWebsocket(
    socket,
    setConnection,
    addPlacement,
    removePlacement,
    onSetTotal
  );
}

function createPoint(point: PointUserType): ymaps.ObjectManagerFeatureType {
  return {
    id: point.id,
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [point.lat, point.lng]
    }
  }
}