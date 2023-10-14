import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import Router from "next/router";

export const parseResponse = <T>(
  query: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
): QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta> => {
  if (query.error) {
    if (query.error.status == 401) Router.push("/auth/login");
    return query;
  }

  const { data } = query as any;

  if (data.data?.todos) return { data: data.data.todos as T };
  if (data.data) return { data: data.data as T };

  return { data: data as T };
};
