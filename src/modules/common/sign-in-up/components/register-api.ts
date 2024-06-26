// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { UseMutationResult, useMutation } from "react-query";
import { queryFetch } from "@/common/fetch-hook";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvTD--F9xjArYjtfethWZJnmQ1ltD8raw",
  authDomain: "tbchbr.firebaseapp.com",
  projectId: "tbchbr",
  storageBucket: "tbchbr.appspot.com",
  messagingSenderId: "457199877990",
  appId: "1:457199877990:web:31e1e7195d3790fbc852a7",
  measurementId: "G-DKCGD6QD2S",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, app, googleProvider };

export const useCreategoogleAcc = (): UseMutationResult<
  {
    message: string;
    data: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      token_type: string;
    };
  },
  unknown,
  { username: string; idToken: string; password: null },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: {
      username: string;

      idToken: string;
      password: null;
    }) =>
      await queryFetch({
        endpoint: "auth/login",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};

export const useCreateAcc = (): UseMutationResult<
  {
    message: string;
    data: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      token_type: string;
    };
  },
  unknown,
  {
    idToken: string;
    nama_user: string;
    email_user: string;
    password: string;
    password_confirmation: string;
  },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: {
      idToken: string;
      nama_user: string;
      email_user: string;
      password: string;
      password_confirmation: string;
    }) =>
      await queryFetch({
        endpoint: "auth/register",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};

export const useForgotPassword = (): UseMutationResult<
  {
    message: string;
    data: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      token_type: string;
    };
  },
  unknown,
  {
    idToken: string;
    email_user: string;
    password: string;
    password_confirmation: string;
  },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: {
      idToken: string;
      email_user: string;
      password: string;
      password_confirmation: string;
    }) =>
      await queryFetch({
        endpoint: "auth/forget-password",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};
