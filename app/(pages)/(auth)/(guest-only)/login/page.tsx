'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {z} from 'zod';

import {login} from '../../../../apis/userApi';
import {useDebounce} from '../../../../hooks/useForm';
import {useUserMutation} from '../../../../queries/user/useUserMutaions';
import {useUserQuery} from '../../../../queries/user/useUserQuries';
import {CodeitError} from '../../../../types/common/error.types';
import {LoginInputsType} from '../../../../types/users/auth.types';
import {LoginSchema} from '../../../../utils/validation';

export default function LoginPage() {
  const {
    register,
    trigger,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });
  const [serverErrorMessage, setServerErrorMessage] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const {getMyInfo} = useUserQuery();
  const {logout} = useUserMutation();
  const {debounceValidate} = useDebounce();
  const router = useRouter();

  const {refetch: userInfoRefetch} = getMyInfo();

  // Form Event
  const onSubmit = async (data: LoginInputsType) => {
    try {
      await login(data.email, data.password);
      setServerErrorMessage({email: '', password: ''}); // Todo: 불필요한 코드로 판단됨, 제거 예정
      userInfoRefetch();
      router.push('/');
    } catch (error) {
      if (error instanceof CodeitError) {
        if (error.code === 'USER_NOT_FOUND' || error.code === 'INVALID_CREDENTIALS') {
          setServerErrorMessage({
            email: error.code === 'USER_NOT_FOUND' ? error.message : '',
            password: error.code === 'INVALID_CREDENTIALS' ? error.message : '',
          });
          return;
        }

        alert('로그인 과정에 문제가 발생했습니다.');
      } else {
        logout();
      }
    }
  };

  // Change Event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target;
    if (name !== 'email' && name !== 'password') {
      return;
    }
    setServerErrorMessage(prev => ({
      email: name === 'email' ? '' : prev.email,
      password: name === 'password' ? '' : prev.password,
    }));
    debounceValidate(name, trigger);
  };

  // Render
  return (
    <div className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 sm:max-w-[600px] sm:px-14 sm:py-8 desktop:max-w-[510px]">
      <h1 className="mb-8 text-center text-2xl font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            아이디
          </label>
          <input
            id="email"
            {...register('email', {
              onChange: handleChange,
            })}
            placeholder="이메일을 입력해주세요"
            className={clsx(
              'w-full rounded-lg border border-transparent bg-gray-50 px-4 py-2 text-base font-medium placeholder:text-gray-400',
              {'border border-red-600': serverErrorMessage.email || errors.email?.message},
            )}
          />
          {errors.email?.message ? (
            <p className="text-sm font-semibold text-red-600">{errors.email.message}</p>
          ) : (
            serverErrorMessage.email && (
              <p className="text-sm font-semibold text-red-600">{serverErrorMessage.email}</p>
            )
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              {...register('password', {
                onChange: handleChange,
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              className={clsx(
                'w-full rounded-lg border border-transparent bg-gray-50 px-4 py-2 text-base font-medium placeholder:text-gray-400',
                {
                  'border border-red-600': serverErrorMessage.password || errors.password?.message,
                },
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-900"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password?.message ? (
            <p className="text-sm font-semibold text-red-600">{errors.password.message}</p>
          ) : (
            serverErrorMessage.password && (
              <p className="text-sm font-semibold text-red-600">{serverErrorMessage.password}</p>
            )
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-400 py-[10px] text-base font-semibold text-white transition duration-200 hover:bg-gray-600"
        >
          로그인
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-800">
        길이 달램이 처음이신가요?{' '}
        <button
          type="submit"
          onClick={() => router.push('/signup')}
          className="box-border border-b border-transparent font-medium text-orange-600 transition duration-200 hover:border-b hover:border-orange-600"
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
