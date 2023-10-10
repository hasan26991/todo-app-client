import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import Router from "next/router";

type ErrorObj = { error: string };

export const parseError = (error: FetchBaseQueryError) => {
  let errorMsg = "Error Message";
  // eslint-disable-next-line no-console
  console.log(error);

  if (!error.data && !(error as ErrorObj).error) {
    return String(error);
  }

  if ((error as ErrorObj).error) {
    return (error as ErrorObj).error;
  }

  if (typeof error.data === "string") {
    errorMsg = error.data.split("\n").filter((e) => e)[0];
  } else {
    const { title, detail } = error.data as { title?: string; detail?: string };
    errorMsg = detail || title || "";
  }

  return errorMsg;
};

export const parseResponse = <T>(
  query: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
): QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta> => {
  if (query.error) {
    console.log(query);
    if (query.error.status == 401) Router.push("/auth/login");
    // console.log("error from rtk", query.error.status);
    return query;
  }

  const { data } = query as any;

  if (data.data?.todos) return { data: data.data.todos as T };
  if (data.data) return { data: data.data as T };

  return { data: data as T };
};
