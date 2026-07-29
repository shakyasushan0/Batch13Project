import apiSlice from "./apiSlice";
import { AUTH_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdateProfileMutation } =
  userApiSlice;
