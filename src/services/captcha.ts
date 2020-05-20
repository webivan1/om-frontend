import { load } from "recaptcha-v3";

const captchaToken = async (action: string) => {
  const captcha = await load(String(process.env.REACT_APP_GOOGLE_CAPTCHA_CLIENT));
  return await captcha.execute(action);
}

export default captchaToken;