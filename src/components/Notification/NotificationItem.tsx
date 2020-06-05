import React, { FC, useEffect } from "react";
import { NotificationType } from "../../store/notification/types";
import { useNotification } from "./hooks/hookNotification";

type PropTypes = {
  notify: NotificationType;
}

export const NotificationItem: FC<PropTypes> = ({ notify }: PropTypes) => {

  const classes = ['notification', 'mb-2'];
  classes.push(`bg-${notify.type}`);

  const { remove } = useNotification();

  useEffect(() => {
    setTimeout(() => remove(notify.id), 3200);
  });

  return (
    <div className={classes.join(' ')}>
      {notify.title ? <div className="notification-title">{notify.title}</div> : null}
      <div className="notification-description">
        {notify.description}
      </div>
    </div>
  )
}