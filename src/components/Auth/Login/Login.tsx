import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { LoginForm } from "./LoginForm";
import { useLoginModal } from "./hooks/hookLoginModal";

export const Login: FC = () => {

  const { isShowModal, handleCloseModal } = useLoginModal();

  return (
    <Modal show={isShowModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Авторизация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm onCompleted={handleCloseModal} />
      </Modal.Body>
    </Modal>
  )
}