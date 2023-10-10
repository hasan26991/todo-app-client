import { IUser } from "@/models/user.model";
import { baseApi } from "./base.service";
import { parseResponse } from "@/utils/apiHelpers";
import ApiUrls from "@/utils/apiUrls";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    loginUser: builder.mutation<void, IUser>({
      queryFn: async (body, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.User.login,
          method: "POST",
          body,
        });
        const response = parseResponse<void>(query);
        return response;
      },
    }),
    signupUser: builder.mutation<void, IUser>({
      queryFn: async (body, api, extraOptions, baseQuery) => {
        const query = await baseQuery({
          url: ApiUrls.User.signup,
          method: "POST",
          body,
        });
        const response = parseResponse<void>(query);
        return response;
      },
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = userApi;
