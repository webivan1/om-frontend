/// <reference path="../../../definitions/ymaps/index.d.ts" />

import React, { FC, useEffect, useState } from "react";

type PropTypes = {
  id: string;
  center: [number, number];
  zoom: number;
  onLoadedMap(map: ymaps.Map): void;
  onChangeMap(map: ymaps.Map): void;
}

export const Ymaps: FC<PropTypes> = (props: PropTypes) => {

  const [map, setMap] = useState<ymaps.Map|undefined>(undefined);

  useEffect(() => {
    const map = new ymaps.Map(props.id, {
      center: props.center,
      zoom: props.zoom
    });

    setMap(map);

    props.onLoadedMap(map);

    return function cleanup() {
      map.destroy();
    }
  }, [props.id]);

  useEffect(() => {
    if (map) {
      map.setCenter(props.center, props.zoom);
      props.onChangeMap(map);
    }
  }, [props.center, props.zoom, map]);

  return (
    <div id={props.id} />
  )
}