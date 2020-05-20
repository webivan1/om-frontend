export type LoginFormType = {
  email: string;
  password: string;
  captcha?: string;
};

export type LoginStateType = {
  loader: boolean;
  error: string|null;
  success: string|null;
  isShowModal: boolean;
};