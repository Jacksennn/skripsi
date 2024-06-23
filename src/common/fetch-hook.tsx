import { notification } from "antd";
import { queryClient } from "./query-client";

const BASE_URL = "https://clicon-server.onrender.com/api";
const LOCAL_STORE_AUTH_ADMIN_KEY = "admin-token";
const LOCAL_STORE_AUTH_USER_KEY = "user-token";

export const setUserLoginToken = (bearer: string) =>
  localStorage.setItem(LOCAL_STORE_AUTH_USER_KEY, bearer);

export const setAdminLoginToken = (bearer: string) =>
  localStorage.setItem(LOCAL_STORE_AUTH_ADMIN_KEY, bearer);

export const getUserLoginToken = async () =>
  (await localStorage.getItem(LOCAL_STORE_AUTH_USER_KEY)) || "";

export const getAdminLoginToken = async () =>
  (await localStorage.getItem(LOCAL_STORE_AUTH_ADMIN_KEY)) || "";

export const removeUserLoginToken = async () =>
  await localStorage.removeItem(LOCAL_STORE_AUTH_USER_KEY);

export const removeAdminLoginToken = async () =>
  await localStorage.removeItem(LOCAL_STORE_AUTH_ADMIN_KEY);

const logout = async (type: "admin" | "user") => {
  window.location.href = type == "user" ? "/sign-in" : `/${type}/sign-in`;
  if (type === "admin") {
    removeAdminLoginToken();
  } else {
    removeUserLoginToken();
  }
  await queryClient.invalidateQueries();
  await queryClient.clear();
};

export const login = async (token: string, type: "admin" | "user") => {
  if (type === "admin") {
    await setAdminLoginToken(token);
    window.location.href = `/admin/dashboard`;
  } else {
    await setUserLoginToken(token);
    window.location.href = `/`;
  }
};

export const catchUnauthorized = (res: Response, type: "admin" | "user") => {
  if (res.status === 401) {
    notification.error({ message: "please re-login" });
    logout(type);
    return;
  }
};

type QueryFetchParams = {
  endpoint: string;
  method: string;
  type: "admin" | "user";
  body?: any;
  params?: { [key: string]: any };
  nojsonFormat?: boolean;
};
export const queryFetch = async ({
  endpoint,
  method,
  type,
  body,
  params,
  nojsonFormat,
}: QueryFetchParams) => {
  const res = await fetch(
    `${BASE_URL}/${type}/${endpoint}` +
      `${params ? `?${new URLSearchParams(params).toString()}` : ""}`,
    {
      method: method,
      headers: {
        "Content-Type": nojsonFormat ? "blob" : "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: `Bearer ${
          type === "admin"
            ? await getAdminLoginToken()
            : await getUserLoginToken()
        }`,
      },
      body: JSON.stringify(body),
    },
  );
  const _res = nojsonFormat ? await res : await res.json();
  if (!res.ok) {
    catchUnauthorized(res, type);
    throw new Error(_res?.message);
  }
  return _res;
};

export const queryFetchFormData = async ({
  endpoint,
  method,
  type,
  body,
}: QueryFetchParams) => {
  const res = await fetch(`${BASE_URL}/${type}/${endpoint}`, {
    method: method,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `Bearer ${
        type === "admin"
          ? await getAdminLoginToken()
          : await getUserLoginToken()
      }`,
    },
    body: body,
  });
  const _res = await res.json();
  if (!res.ok) {
    catchUnauthorized(res, type);
    throw new Error(_res?.message);
  }
  return _res;
};
