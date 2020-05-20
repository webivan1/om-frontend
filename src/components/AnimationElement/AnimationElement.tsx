import React, {
  FC,
  ReactElement,
  RefAttributes,
  useEffect,
  createRef,
} from "react";

export type PropTypes = {
  children: ReactElement;
  nameEvent: "bounce" | "pulse" | "flash" | "rubberBand" | "shake" | "swing" | "tada";
  interval?: number;
  delay?: number;
  iterations?: number;
}

export const AnimationElement: FC<PropTypes> = (
  { children, nameEvent, delay = 0, interval = 4, iterations }: PropTypes
): ReactElement => {

  // Working
  const elementRef = createRef<HTMLElement>();

  const element = React.cloneElement<RefAttributes<HTMLElement>>(children, {
    ref: elementRef
  });

  useEffect(() => {
    if (elementRef.current) {
      const el: HTMLElement = elementRef.current;

      let timer: NodeJS.Timeout;
      let i: number|undefined = iterations;

      el.classList.add('animated');

      setTimeout(() => {
        el.classList.add(nameEvent);

        if (typeof i === 'number') {
          i--;
        }

        if (interval > 0) {
          timer = setInterval(() => {
            el.classList.remove(nameEvent);
            setTimeout(() => el.classList.add(nameEvent));

            if (typeof i === 'number') {
              if (i <= 1) {
                clearInterval(timer);
              } else {
                i--;
              }
            }
          }, interval * 1000);
        }
      }, delay * 1000);
    }
  }, [1]);

  return element;
}