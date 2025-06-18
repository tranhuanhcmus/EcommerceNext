import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './authSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<
      AuthResponse,
      Omit<RegisterRequest, 'confirmPassword'>
    >({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  util: { getRunningQueriesThunk },
} = authApi;
