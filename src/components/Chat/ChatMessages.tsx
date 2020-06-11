import React, { FC, createRef } from "react";
import { useListenMessages } from "./hooks/hookListenMessages";
import { useScrollChat } from "./hooks/hookScrollChat";
import { useMessageList } from "./hooks/hookMessageList";
import { SpinnerBlock } from "../UI/Spinner/Spinner";
import { Spinner } from "react-bootstrap";
import { ChatMessage } from "./ChatMessage";

export const ChatMessages: FC = () => {

  const container = createRef<HTMLDivElement>();

  // new messages
  useListenMessages();

  // scroll
  useScrollChat(container);

  // list messages
  const { loader, error, items } = useMessageList(container);

  return (
    <div className="chat-messages" ref={container}>
      {loader ? (
        <div className="d-flex justify-content-center">
          <Spinner animation={'grow'} variant={'info'} />
        </div>
      ) : null}

      {items.map((item, index) => (
        <ChatMessage item={item} key={item.id ?? index} />
      ))}
    </div>
  )
}