import { CartsRespondType } from "../cart/api";

const LOCALE_STORAGE_KEY = "_checkout_bucket_";

export const setCheckoutBucket = (items: CartsRespondType[]) =>
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(items));

export const getBucket = (): CartsRespondType[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)!);
  }
  return [];
};

export const resetBucket = () =>
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify([]));
