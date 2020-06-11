import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useChatHeading } from "./hooks/hookChatHeading";

export const ChatHeading: FC = () => {

  const { settings, toggleChat } = useChatHeading();

  return (
    <div className="chat-heading" onClick={toggleChat}>
      <FontAwesomeIcon icon={faComment} /> Чат
    </div>
  )
}