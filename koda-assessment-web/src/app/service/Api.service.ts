interface ApiRequestProps {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  body?: any;
  params?: Record<string, string | number | boolean | null | undefined>;
  headers?: any;
  authorization?: boolean;
  isMultipart?: boolean;
  responseType?: "json" | "text" | "blob";
  apiVersion?: string;
}

const removeTrailingDot = (str: string) =>
  str?.endsWith(".") ? str.slice(0, -1) : str;

const handleErrors = ({ message, error }, status?: number) => {
  const msg = message?.trim();
  const err = error?.trim();

  const finalMessage =
    msg && err
      ? `${removeTrailingDot(msg)}: ${removeTrailingDot(err)}`
      : removeTrailingDot(msg || err); // at least one is guaranteed

  const errorWithStatus = new Error(finalMessage);
  // Add status as a property for easier access
  (errorWithStatus as any).status = status;

  return errorWithStatus;
};

export const DefaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const ApiRequest = async ({
  method = "GET",
  url = "",
  headers = DefaultHeaders,
  body = null,
  params = {},
  authorization = true,
  isMultipart = false,
  responseType = "json",
  apiVersion = "api",
}: ApiRequestProps) => {
  const { VITE_API_URL } = import.meta.env;
  const apiUrl = new URL(url, 'http://127.0.0.1:8000/api');

  // if (queryParams) {
  //   Object.keys(queryParams).forEach((key) => apiUrl.searchParams.append(key, queryParams[key]));
  // }

  if (params) {
    Object.keys(params).forEach((key) =>
      apiUrl.searchParams.append(key, params[key]),
    );
  }

  if (apiVersion) {
    apiUrl.pathname = `/${apiVersion}${apiUrl.pathname}`;
  }

  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  headers["Content-Type"] = "application/json";
  if (isMultipart) {
    delete headers["Content-Type"];
  }

  const newBody = isMultipart ? body : JSON.stringify(body);

  const response = await fetch(apiUrl.toString(), {
    method,
    headers,
    body: body && newBody,
  });

  if (responseType === "blob") {
    if (!response.ok) {
      const json = await response.json();
      throw handleErrors(json, response.status);
    }
    const contentDisposition = response.headers.get("Content-Disposition");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    return { url, contentDisposition };
  }

  if (responseType === "text") {
    if (!response.ok) {
      const json = await response.json();
      throw handleErrors(json, response.status);
    }

    return response.text();
  }
  const json = await response.json();

  if (!response.ok) {
    throw handleErrors(json, response.status);
  }

  return json;
};
