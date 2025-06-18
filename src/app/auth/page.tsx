'use client';

import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation, useRegisterMutation } from '@/features/auth/authApi';
import { useAppDispatch } from '@/lib/store';
import { loginSuccess, loginFailure } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from '@/hooks/useAuthForm';
import Link from 'next/link';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();

  type FormType = LoginFormData | RegisterFormData;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm<FormType>({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema) as any,
    defaultValues: {
      email: '',
      password: '',
      ...(!isLogin ? { name: '', confirmPassword: '' } : {}),
    },
  });

  const isRegisterError = (
    error: unknown
  ): error is {
    data: { message: string; errors?: Record<string, string[]> };
  } => {
    return (
      typeof error === 'object' &&
      error !== null &&
      'data' in error &&
      typeof (error as any).data === 'object' &&
      (error as any).data !== null
    );
  };

  type FieldName = keyof LoginFormData | keyof RegisterFormData;

  const getFieldError = (field: FieldName) => {
    return (errors as Record<string, any>)[field]?.message as
      | string
      | undefined;
  };

  const isRegisterData = (data: FormType): data is RegisterFormData => {
    return 'name' in data && 'confirmPassword' in data;
  };

  const hasError = (field: FieldName) => {
    return !!getFieldError(field);
  };

  const getFieldValue = (field: FieldName) => {
    return (control._formValues as Record<string, any>)[field];
  };

  const setFieldError = (field: string, message: string) => {
    setError(field as FieldName, {
      type: 'server',
      message,
    });
  };

  const onSubmit: SubmitHandler<
    LoginFormData | RegisterFormData
  > = async data => {
    try {
      let response;

      if (isLogin) {
        const loginData = data as LoginFormData;
        response = await login(loginData).unwrap();
      } else {
        const registerData = data as RegisterFormData;
        const { confirmPassword, ...userData } = registerData;
        response = await register(
          userData as Omit<RegisterFormData, 'confirmPassword'>
        ).unwrap();
      }

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      router.push('/');
    } catch (error: any) {
      if (isRegisterError(error)) {
        if (error.data.errors) {
          Object.entries(error.data.errors).forEach(([field, messages]) => {
            const message = Array.isArray(messages) ? messages[0] : messages;
            if (
              ['email', 'password', 'name', 'confirmPassword'].includes(field)
            ) {
              setFieldError(field as FieldName, message);
            }
          });
        } else {
          dispatch(loginFailure(error.data.message || 'An error occurred'));
        }
      } else {
        dispatch(loginFailure('An unexpected error occurred'));
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                          hasError('name' as FieldName)
                            ? 'border-red-300'
                            : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        placeholder="Full name"
                      />
                      {getFieldError('name' as FieldName) && (
                        <p className="mt-1 text-sm text-red-600">
                          {getFieldError('name' as FieldName)}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="email"
                      autoComplete="email"
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                        hasError('email') ? 'border-red-300' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 ${
                        isLogin ? 'rounded-t-md' : ''
                      } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Email address"
                      value={getFieldValue('email')}
                    />
                    {getFieldError('email') && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError('email')}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="password"
                      autoComplete={
                        isLogin ? 'current-password' : 'new-password'
                      }
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                        hasError('password')
                          ? 'border-red-300'
                          : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 ${
                        isLogin ? 'rounded-b-md' : ''
                      } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Password"
                      value={getFieldValue('password')}
                    />
                    {getFieldError('password') && (
                      <p className="mt-1 text-sm text-red-600">
                        {getFieldError('password')}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="password"
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                          hasError('confirmPassword' as FieldName)
                            ? 'border-red-300'
                            : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        placeholder="Confirm Password"
                      />
                      {getFieldError('confirmPassword' as FieldName) && (
                        <p className="mt-1 text-sm text-red-600">
                          {getFieldError('confirmPassword' as FieldName)}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).length > 0}
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? 'New to our platform?' : 'Already have an account?'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleAuthMode}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Create a new account' : 'Sign in to existing account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
