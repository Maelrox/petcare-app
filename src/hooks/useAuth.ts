import { addToast } from "../components/utils/toasterStore";
import handleErrorResponse from "../components/utils/errorHandler";
import { generateRequestOptions } from "../components/utils/httpHandler";
import type { LoginRequest, LoginResponse } from "../types/AuthType";

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
