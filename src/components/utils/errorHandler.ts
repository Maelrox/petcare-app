import type { ErrorResponse } from "../../types/ErrorType";
import { addToast } from "./toasterStore";

const handleErrorResponse = async (
  response: Response,
  skipToken?: boolean
): Promise<string> => {
  if (!skipToken && response.status === 401) {
    window.location.href = "/";
    return Promise.reject("Unauthorized - redirecting to login");
  }
  const responseBody = await response.json();
  const errorResponse = responseBody as ErrorResponse | null;
  const message = `${errorResponse?.message || "network response was not ok"}`;
  console.error(message);
  addToast(`Error: ${message}`);
  return message;
};

export default handleErrorResponse;
