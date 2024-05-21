import { notification } from "antd";
import { useRouter } from "next/router";
import { queryClient } from "./query-client";

const BASE_URL = "https://clicon-server.onrender.com/api";
const LOCAL_STORE_AUTH_ADMIN_KEY = "admin-token";
const LOCAL_STORE_AUTH_USER_KEY = "user-token";

export const setUserLoginToken = (bearer: string) =>
  localStorage.setItem(LOCAL_STORE_AUTH_USER_KEY, JSON.stringify(bearer));

export const setAdminLoginToken = (bearer: string) =>
  localStorage.setItem(LOCAL_STORE_AUTH_ADMIN_KEY, JSON.stringify(bearer));

export const getUserLoginToken = async () =>
  (await localStorage.getItem(LOCAL_STORE_AUTH_USER_KEY)) || "";

export const getAdminLoginToken = async () =>
  (await localStorage.getItem(LOCAL_STORE_AUTH_ADMIN_KEY)) || "";

export const removeUserLoginToken = async () =>
  await localStorage.removeItem(LOCAL_STORE_AUTH_USER_KEY);

export const removeAdminLoginToken = async () =>
  await localStorage.removeItem(LOCAL_STORE_AUTH_ADMIN_KEY);

const logout = async (type: "admin" | "user") => {
  window.location.href = `${type}/sign-in`;
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
    window.location.href = `/${type}/dashboard`;
  } else {
    await setUserLoginToken(token);
    window.location.href = `/${type}`;
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
};
export const queryFetch = async ({
  endpoint,
  method,
  type,
  body,
}: QueryFetchParams) => {
  const res = await fetch(`${BASE_URL}/${type}/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `Bearer ${
        type === "admin"
          ? await getAdminLoginToken()
          : await getUserLoginToken()
      }`,
    },
    body: JSON.stringify(body),
  });
  const _res = await res.json();
  if (!res.ok) {
    catchUnauthorized(res, type);
    throw new Error(_res?.message);
  }
  return _res;
};