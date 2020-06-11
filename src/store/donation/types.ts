export enum DonationStatuses {
  'approved' = 'approved',
  'rejected' = 'rejected',
  'waiting' = 'waiting'
}

export enum DonationResponseStatuses {
  'success' = 'success',
  'error' = 'error'
}

export enum DonationMethods {
  'paypal' = 'paypal',
  'tinkoff' = 'tinkoff'
}

export type DonationType = {
  id: number;
  amount: number;
  username: string;
  status: keyof typeof DonationStatuses;
};

export type DonationFormType = {
  eventId: number|null;
  amount: number;
  source: keyof typeof DonationMethods;
  username: string;
  email: string|null;
  message: string|null;
};

export type DonationFormStateType = {
  isOpenModal: boolean;
  loader: boolean;
  error: string|null;
  success: DonationResponseSuccessType|null;
  form?: DonationFormType;
};

export type DonationResponseSuccessType = {
  status: DonationResponseStatuses.success;
  donationId: number;
  redirectUrl: string;
};

export type DonationResponseErrorType = {
  status: DonationResponseStatuses.error;
  message: string;
};

export type DonationResponseType = DonationResponseSuccessType | DonationResponseErrorType;