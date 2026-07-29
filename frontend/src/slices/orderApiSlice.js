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
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaymentDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/getpaymentdetails`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useLazyGetPaymentDetailsQuery,
  useGetMyOrdersQuery,
} = orderApiSlice;
