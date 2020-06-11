import React, { FC } from "react";
import { useChat } from "./hooks/hookChat";

import { ChatHeading } from "./ChatHeading";
import { ChatMessages } from "./ChatMessages";
import { ChatForm } from "./ChatForm";

export const Chat: FC = () => {

  const { canWriteChat, settings } = useChat();
  const styles = ['chat', 'depth-1'];

  if (settings.isOpen) {
    styles.push('is-opened');
  }

  return (
    <div className={styles.join(' ')}>
      <ChatHeading />

      <ChatMessages />

      {canWriteChat ? <ChatForm /> : null}
    </div>
  )
}