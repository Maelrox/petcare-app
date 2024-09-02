import type { APIRoute } from "astro";
export const prerender = false;

const LOGIN_URL = import.meta.env.LOGIN_URL;
const RECAPTCHA_PRIVATE_KEY = import.meta.env.RECAPTCHA_PRIVATE_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token, userName, password } = await request.json();
    const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";

    const requestBody = new URLSearchParams({
        secret: RECAPTCHA_PRIVATE_KEY,
        response: token
      });

    const recaptchaResponse = await fetch(recaptchaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
    });

    const recaptchaData = await recaptchaResponse.json();
    if (recaptchaData.success && recaptchaData.score >= 0.5) {
      const loginResponse = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      return loginResponse
      
      
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "reCAPTCHA verification failed or score too low",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in login process:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
