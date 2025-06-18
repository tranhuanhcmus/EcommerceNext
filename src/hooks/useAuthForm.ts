import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;

export const useAuthForm = (isLogin: boolean) => {
  const schema = isLogin ? loginSchema : registerSchema;

  return useForm<LoginFormData | RegisterFormData>({
    resolver: yupResolver(schema as any),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      ...(!isLogin ? { name: '', confirmPassword: '' } : {}),
    },
  });
};
