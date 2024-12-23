const axios = require("axios");

async function verifyRecaptcha(recaptchaResponse) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaResponse) {
    throw new Error("reCAPTCHA response is required");
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: recaptchaResponse,
        },
      }
    );

    if (!response.data.success) {
      throw new Error("reCAPTCHA verification failed");
    }

    return true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    throw new Error("Error verifying reCAPTCHA");
  }
}

module.exports = { verifyRecaptcha };
