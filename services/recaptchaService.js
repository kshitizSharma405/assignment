const axios = require("axios");

async function verifyRecaptcha(recaptchaResponse) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Ensure reCAPTCHA response is provided
  if (!recaptchaResponse) {
    throw new Error("reCAPTCHA response is required");
  }

  try {
    // Send POST request to verify reCAPTCHA response with Google's API
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

    // Check if reCAPTCHA verification is successful
    if (!response.data.success) {
      throw new Error("reCAPTCHA verification failed");
    }

    return true; // Return true if reCAPTCHA verification is successful
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    throw new Error("Error verifying reCAPTCHA");
  }
}

module.exports = { verifyRecaptcha };
