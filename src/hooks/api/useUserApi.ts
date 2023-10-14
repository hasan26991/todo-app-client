import { IError } from "@/models/error.model";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "@/services/user.service";
import { useMemo } from "react";

export const useUserApi = () => {
  const [
    login,
    {
      isSuccess: isSuccessLogin,
      isError: isErrorLogin,
      error: errorLogin,
      isLoading: isLoadingLogin,
    },
  ] = useLoginUserMutation();

  const [
    signup,
    {
      isSuccess: isSuccessSignup,
      isError: isErrorSignup,
      error: errorSignup,
      isLoading: isLoadingSignup,
    },
  ] = useSignupUserMutation();

  const loginErrors = useMemo(() => {
    if (errorLogin) {
      const { data } = errorLogin as any;
      return data.errors as IError[];
    }

    return [];
  }, [errorLogin]);

  const signupErrors = useMemo(() => {
    if (errorSignup) {
      const { data } = errorSignup as any;
      return data.errors as IError[];
    }

    return [];
  }, [errorSignup]);

  return {
    login,
    isSuccessLogin,
    signup,
    isSuccessSignup,
    isErrorSignup,
    isLoadingLogin,
    isLoadingSignup,
    signupErrors: signupErrors ?? [],
    loginErrors: loginErrors ?? [],
  };
};
