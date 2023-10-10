import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RequestTags, baseApi } from "./base.service";
import { parseResponse } from "@/utils/apiHelpers";
import { ITodo } from "@/models/todo.model";
import ApiUrls from "@/utils/apiUrls";

export const todoApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      providesTags: [RequestTags.Todos],
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.Todo.todo,
        });
        const response = parseResponse<ITodo[]>(query);
        return response;
      },
    }),
    addTodo: builder.mutation<ITodo, Omit<ITodo, "id" | "completed">>({
      invalidatesTags: [RequestTags.Todos],
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.Todo.addTodo,
          method: "POST",
          body: { ...args },
        });
        const response = parseResponse<ITodo>(query);
        return response;
      },
    }),
    deleteTodo: builder.mutation<void, Omit<ITodo, "message" | "completed">>({
      invalidatesTags: [RequestTags.Todos],
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: `${ApiUrls.Todo.todo}/${args.id}`,
          method: "DELETE",
        });
        const response = parseResponse<void>(query);
        return response;
      },
    }),
    updateTodo: builder.mutation<void, Omit<ITodo, "message" | "completed">>({
      invalidatesTags: [RequestTags.Todos],
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: `${ApiUrls.Todo.todo}/${args.id}`,
          method: "PUT",
        });
        const response = parseResponse<void>(query);
        return response;
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
