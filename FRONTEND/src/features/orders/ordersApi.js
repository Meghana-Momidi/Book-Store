import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"], // Declare tag type for cache invalidation
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"], // Invalidate cache for orders
    }),
    getOrdersByEmail: builder.query({
      query: (email) => `/${email}`,
      providesTags: ["Orders"], // Associate this query with the 'Orders' tag
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi;

export default ordersApi;
