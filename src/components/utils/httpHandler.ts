import type { PaginationParams, RequestOptions } from "../../types/RequestType";
import { addToast } from "./toasterStore";

export const configureRequestHeader = (options: RequestOptions): Headers => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json")

  try {
    if (!options.skipToken) {
      const storedData = sessionStorage.getItem("userData")
      if (!storedData) {
        window.location.href = "/";
        throw new Error("Unauthorized: No session data found.")
      }
      const { token } = JSON.parse(storedData);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      } else {
        window.location.href = "/";
        throw new Error("Unauthorized: No token found in session data.")
      }
    }
  } catch (error) {
    console.error("Failed to configure request headers:", error)
    throw error;
  }
  return headers;
};

export const generateRequestOptions = (
  method: string,
  body?: object,
  skipToken?: boolean
): RequestOptions | undefined => {
  try {
    const options: RequestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      skipToken: skipToken,
      method : method
    };

    if (body) {
      options.body = JSON.stringify(body)
    } else {
    }

    return options;
  } catch (e) {
    addToast("Unknown error")
    console.error(e)
    return undefined
  }
};

export const generateRequestOptionsForFileUpload = (
  method: string,
  file: File,
  description?: string,
  skipToken?: boolean
): RequestOptions | undefined => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description || "");

    const options: RequestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: method,
      skipToken: skipToken,
      body: formData,
    };

    return options;
  } catch (e) {
    console.error("Unknown error", e);
    return undefined;
  }
};



export const buildPaginatedUrl = (baseUrl: string, pagination: PaginationParams, queryParams?: string): string | undefined => {
  try {
    let url = `${baseUrl}?page=${pagination.page}&pageSize=${pagination.pageSize}`
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString()
      url += `&${queryString}`
    }
    return url;
  } catch (e) {
    addToast("Unknown error")
    console.error(e);
    return undefined
  }

};