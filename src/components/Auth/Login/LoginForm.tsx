import React, { FC } from "react";
import { Form, Button, FormControl, Alert } from "react-bootstrap";
import { emailRegex } from "../../../regex";

// Types
import { useLoginForm } from "./hooks/hookLoginForm";

type PropTypes = {
  onCompleted?: () => void;
}

export const LoginForm: FC<PropTypes> = ({ onCompleted }: PropTypes) => {

  const {
    login: { loader, error },
    hookForm: { register, errors, handleSubmit },
    onSubmit
  } = useLoginForm(onCompleted);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Email <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="email"
          ref={register<FormControl & HTMLInputElement>({
            required: true,
            pattern: emailRegex,
            maxLength: 50
          })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type={'invalid'}>Введите корректный email адрес</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Пароль <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="password"
          name="password"
          ref={register<FormControl & HTMLInputElement>({
            required: true,
            maxLength: 50,
            minLength: 5
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type={'invalid'}>Введите пароль от 5 до 50 символов</Form.Control.Feedback>
      </Form.Group>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <div className="text-center">
        <Button disabled={loader} variant="primary" type="submit">
          Войти
        </Button>
      </div>
    </Form>
  )
}