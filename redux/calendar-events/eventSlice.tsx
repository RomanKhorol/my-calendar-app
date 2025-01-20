import { createApi } from "@reduxjs/toolkit/query/react";
import { firestoreBaseQuery } from "../../firebase/baseQuery";

export const firestoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: firestoreBaseQuery,
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (coll) => ({ coll, method: "get" }),
      providesTags: ["Events"],
    }),
    addEvent: builder.mutation({
      query: ({ coll, data }) => ({ coll, method: "add", data }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ coll, id, data }) => ({
        coll,
        method: "update",
        id,
        data,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: ({ coll, id }) => ({ coll, method: "delete", id }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = firestoreApi;
