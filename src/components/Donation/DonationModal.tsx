import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDonationModal } from "./hooks/hookDonationModal";
import { DonationForm } from "./DonationForm";

export const DonationModal: FC = () => {

  const { isOpen, close } = useDonationModal();

  return (
    <Modal
      show={isOpen}
      onHide={close}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Пожертвовать на развитие проекта
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <DonationForm />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>Закрыть окно</Button>
      </Modal.Footer>
    </Modal>
  )
}