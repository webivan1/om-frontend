import React, { FC, FormEvent } from "react";
import { Form, FormControl, Alert, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../regex";

// Types
import {
  DonationFormType,
  DonationResponseSuccessType
} from "../../store/donation/types";
import { useDonation } from "./hooks/hookDonation";

export const DonationForm: FC = () => {

  const { event, loader, error, success, defaultValues, handleSubmit: onSubmit } = useDonation();

  const { errors, register, handleSubmit } = useForm<DonationFormType>({
    defaultValues: defaultValues
  });

  let hasEventActive: boolean = false;

  if (event) {
    hasEventActive = event.isStarted && !event.isFinished;
  }

  return (
    <Form onSubmit={(e: FormEvent) => !loader ? handleSubmit(onSubmit)(e) : null}>
      <Form.Group>
        <Form.Label>
          Сумма <span className={'text-danger'}>*</span>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="amount"
            ref={register<FormControl & HTMLInputElement>({
              required: true,
              min: 50,
              pattern: /^\d+$/,
            })}
            isInvalid={!!errors.amount}
          />
          <InputGroup.Append>
            <InputGroup.Text>₽</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Form.Control.Feedback style={{ display: !!errors.amount ? 'block' : 'none' }} type={'invalid'}>
          Введите сумму пожертвования, минимальная сумма 50 рублей
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Способ оплаты <span className={'text-danger'}>*</span>
        </Form.Label>
        <Form.Control
          as="select"
          name="source"
          ref={register<FormControl & HTMLSelectElement>({ required: true })}
          isInvalid={!!errors.source}
        >
          <option value={'paypal'}>Paypal</option>
          <option value={'tinkoff'}>Банковской картой</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Произвольное имя <span className={'text-danger'}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          ref={register<FormControl & HTMLInputElement>({ required: true })}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type={'invalid'}>
          Укажите произвольное имя
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control
          type="text"
          name="email"
          ref={register<FormControl & HTMLInputElement>({
            pattern: emailRegex,
            maxLength: 50
          })}
          isInvalid={!!errors.email}
        />
      </Form.Group>

      <Form.Group>
        {hasEventActive ? (
          <Form.Label>
            Публичное сообщение в чат
          </Form.Label>
        ) : (
          <Form.Label>
            Сообщение администратору
          </Form.Label>
        )}
        <Form.Control
          as={'textarea'}
          name="message"
          maxLength={255}
          ref={register<FormControl & HTMLTextAreaElement>({ maxLength: 255 })}
          isInvalid={!!errors.message}
        />
      </Form.Group>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {success ? (
        <Alert variant="success">
          Платеж №{success.donationId} был успешно создан,{' '}
          <a href={success.redirectUrl} target="_blank">Вы можете перейти к оплате</a>
        </Alert>
      ) : null}

      <div className="text-center">
        <Button type="submit" disabled={loader} variant="outline-success">
          Оплатить
        </Button>
      </div>
    </Form>
  )
}