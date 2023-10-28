import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">;

type ResponseLogindata = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLogindata, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLogindata, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<ResponseLogindata, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useCurrentQuery, useLoginMutation, useRegisterMutation } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
