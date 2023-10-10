import { IError } from "@/models/error.model";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/services/todo.service";
import { useMemo } from "react";

export const useTodoApi = () => {
  const { data, error, isLoading: isLoadingTodos } = useGetTodosQuery();

  const [
    addTodo,
    {
      isLoading: isLoadingAddTodo,
      isSuccess: isSuccessAddTodo,
      error: errorAddTodo,
    },
  ] = useAddTodoMutation();

  const [
    deleteTodo,
    { isLoading: isLoadingDeleteTodo, isSuccess: isSuccessDeleteTodo },
  ] = useDeleteTodoMutation();

  const [
    updateTodo,
    { isLoading: isLoadingUpdateTodo, isSuccess: isSuccessUpdateTodo },
  ] = useUpdateTodoMutation();

  const addTodoErrors = useMemo(() => {
    if (errorAddTodo) {
      const { data } = errorAddTodo as any;
      return data.errors as IError[];
    }

    return [];
  }, [errorAddTodo]);

  const filteredTodos = useMemo(() => {
    if (data) {
      return data.filter((todo) => {
        return !todo.completed;
      });
    }
    return [];
  }, [data]);

  return {
    todos: data ?? [],
    addTodo,
    deleteTodo,
    updateTodo,
    addTodoErrors,
    filteredTodos,
    isLoading:
      isLoadingTodos ||
      isLoadingAddTodo ||
      isLoadingDeleteTodo ||
      isLoadingUpdateTodo,
  };
};
