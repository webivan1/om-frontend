/// <reference path="../../../definitions/ymaps/index.d.ts" />

import { FC, ReactElement, useState } from "react";

type PropTypes = {
  children: ReactElement;
}

export const YmapsProvider: FC<PropTypes> = (props: PropTypes) => {

  const [isLoading, setLoading] = useState<boolean>(true);

  (async () => {
    await ymaps.ready(() => {
      setLoading(false);
    });
  })()

  if (!isLoading) {
    return props.children;
  }

  return null;
}