import { addToast } from "../../components/utils/toasterStore";
import { isSpinnerRunning } from "../../components/utils/spinnerStore";
import handleErrorResponse from "../../components/utils/errorHandler";
import type { RequestOptions } from "../../types/RequestType";
import { configureRequestHeader } from "../../components/utils/httpHandler";

export async function useFetchData<T>(
  url: string,
  options: RequestOptions
): Promise<T | undefined> {
  isSpinnerRunning.set(true);
  try {
    const headers = configureRequestHeader(options)
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorMessage = await handleErrorResponse(response, options.skipToken);
      throw new Error(errorMessage);
    }
    const responseBody = await response.json();
    return responseBody as T;
  } catch (error) {
    let errorMessage;
    if (error && error instanceof Error && error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown Error";
      addToast(`Error ${errorMessage}`);
    }
    return undefined;
  } finally {
    isSpinnerRunning.set(false);
  }
}


