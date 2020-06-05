import React, { FC } from "react";
import { useSelector } from "react-redux";

// Types
import { RootState } from "../../store/store";
import { NotificationStateType } from "../../store/notification/types";
import { NotificationItem } from "./NotificationItem";

export const Notification: FC = () => {

  const { notifications } = useSelector<RootState, NotificationStateType>(state => state.notification);

  return (
    <div className="notification-wrapper">
      {notifications.map(notify => (
        <NotificationItem notify={notify} key={notify.id} />
      ))}
    </div>
  )
}