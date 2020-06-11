import React, { FC } from "react";
// @ts-ignore
import { Remarkable } from "remarkable";
import { MessageType } from "../../store/chat/types";
import moment from "../../services/moment";

type PropTypes = {
  item: MessageType;
}

export const ChatMessage: FC<PropTypes> = ({ item }: PropTypes) => {

  const styles = ['chat-message'];

  if (item.donation) {
    styles.push('donation');
  } else if (item.organizer) {
    styles.push('organizer', 'chat-message-right');
  }

  const markdown = new Remarkable();

  const created = moment(new Date(item.createdAt))
    .utcOffset(item.event.timezoneUTC);

  return (
    <div className={styles.join(' ')}>
      <div className="message-time">
        {item.user?.name ?? item.donation?.name ?? 'Guest'}, {created.format('Do MMM, HH:mm')}
      </div>
      <div className="message-content" dangerouslySetInnerHTML={{
        __html: markdown.render(item.message)
      }} />
    </div>
  )
}