import { ORDER_URL, PRODUCT_URL } from "../constants";
import apiSlice from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddOrderMutation } = orderApiSlice;
