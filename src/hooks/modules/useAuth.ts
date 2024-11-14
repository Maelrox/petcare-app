import type { LoginRequest, LoginResponse } from "../../types/AuthTypes";
import handleErrorResponse from "../../components/utils/errorHandler";
import { generateRequestOptions } from "../../components/utils/httpHandler";
import { addToast } from "../../components/utils/toasterStore";
import type { RegisterRequest } from "../../types/RegisterRequestType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_MANAGEMENT = "/management/"

export const login = async (userName: string, password: string, token: string): Promise<LoginResponse | undefined> => {
  const requestPayload: LoginRequest = { userName, password, token };
  const options = generateRequestOptions("POST", requestPayload, true);

  if (options) {
    try {
      const response = await fetch(`/api/login`, options);
      if (response.ok) {
        const data: LoginResponse = await response.json();
        return data;
      } else {
        const errorMessage = await handleErrorResponse(response, true);
        throw new Error(errorMessage);
      }
    } catch (error) {
      let errorMessage;
      if (error && error instanceof Error && error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Unknown Error";
        addToast(`Error ${errorMessage}`);
      }
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const register = async (registerData: RegisterRequest): Promise<void> => {
  const options = generateRequestOptions("POST", registerData, true);
  if (options) {
    try {
      const response = await fetch(BASE_URL + PATH_MANAGEMENT + '/user/register', options);
      if (response.ok) {
        addToast('Registration successful!');
      } else {
        const errorMessage = await handleErrorResponse(response, true);
        throw new Error(errorMessage);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Unknown Error";
      }
      addToast(`Error: ${errorMessage}`);
    }
  }
};