import { createAction } from "@reduxjs/toolkit";
import { registerNotification } from "../notification/actions";
import api from "../../api";

// Types
import { AppThunk } from "../store";
import {
  DonationFormType,
  DonationResponseStatuses,
  DonationResponseSuccessType, DonationType
} from "./types";
import { Echo } from "../../services/echo/echo.service";
import { NotificationTypes } from "../notification/types";

declare const window: Window;

export const openModal = createAction('donation-form/open-modal');
export const closeModal = createAction('donation-form/close-modal');
export const setLoader = createAction<boolean>('donation-form/set-loader');
export const setError = createAction<string|null>('donation-form/set-error');
export const setSuccess = createAction<DonationResponseSuccessType>('donation-form/set-success');
export const setForm = createAction<DonationFormType>('donation-form/set-form');
export const reset = createAction('donation-form/reset');

export const createInvoiceAsync = (form: DonationFormType): AppThunk => async (dispatch, getState) => {
  dispatch(setLoader(true));
  dispatch(setForm(form));

  try {
    const detail = getState().publicEventDetail.detail;

    let eventId: null|number = null;

    if (detail && detail.isStarted && !detail.isFinished) {
      eventId = detail.id;
    }

    const response = await api.public.donation.create({...form, eventId});
    if (response.status === DonationResponseStatuses.success) {
      dispatch(setSuccess(response));

      createPopup(response.redirectUrl);

      const channelName = `donation-${response.donationId}`;

      const handlerMessage = (type: keyof typeof NotificationTypes, message: string) => {
        dispatch(closeModal());
        dispatch(reset());
        dispatch(registerNotification(type, message));

        if (type !== NotificationTypes.info) {
          Echo.leave(channelName);
        }
      };

      Echo.channel(channelName)
        .listen('approved', (donation: DonationType) =>
          handlerMessage('success', 'Мы благодарим Вас за помощь в развитии проекта!')
        )
        .listen('failed', (donation: DonationType) =>
          handlerMessage('danger', 'Не удалось пожертвовать средства =(')
        )
        .listen('wait', (donation: DonationType) =>
          handlerMessage('info', 'Оплата проверяется платежной системой')
        );
    } else {
      throw new Error(response.message);
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}

export function createPopup(url: string): void {
  const width: number = 450;
  const height: number = 380;

  const centerWidth = (window.screen.width - width) / 2;
  const centerHeight = (window.screen.height - height) / 2;

  const windowPopup = window.open(
    url,
    'donation_popup',
    `width=${width},height=${height},left=${centerWidth},top=${centerHeight},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes`
  );

  if (windowPopup) {
    windowPopup.focus();
  }
}