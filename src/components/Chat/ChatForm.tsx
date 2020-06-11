import React, { FC, createRef, KeyboardEvent } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useChatForm } from "./hooks/hookChatForm";

export const ChatForm: FC = () => {

  const field = createRef<HTMLTextAreaElement>();

  const { loader, handlerSubmit } = useChatForm();

  const onPressEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.altKey || event.ctrlKey) && event.keyCode === 13) {
      handlerSubmit(event.currentTarget.value.trim()).then();
      event.currentTarget.value = '';
    }
  }

  const onClickButton = () => {
    if (field.current) {
      handlerSubmit(field.current.value.trim()).then();
      field.current.value = '';
    }
  }

  return (
    <div className="chat-form">
      <textarea
        className="form-control"
        cols={1}
        rows={1}
        maxLength={255}
        style={{ resize: 'none' }}
        onKeyUp={onPressEnter}
        ref={field}
        disabled={loader}
      />

      <Button disabled={loader} onClick={onClickButton} variant="info" className="col-auto">
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  )
}