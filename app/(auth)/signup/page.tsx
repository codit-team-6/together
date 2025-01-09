'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';

const SignupSchema = z.object({
  name: z.string().trim()
    .min(1, '이름을 입력해주세요'),
  
  email: z.string().trim()
    .min(1, '이메일을 입력해주세요')
    .email('유효한 이메일 주소를 입력하세요'),
  
  companyName: z.string().trim()
    .min(1, '회사명을 입력해주세요'),
  
  password: z.string().trim()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다"
    ),
  
  passwordCheck: z.string().trim()
    .min(1, '비밀번호 확인을 입력해주세요')
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordCheck"]
});

type TSignupInputs = z.infer<typeof SignupSchema>;

export default function SignupPage() {
  const router = useRouter();
  
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupInputs>({
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      password: '',
      passwordCheck: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(SignupSchema),
  });

  const [serverErrorMessage, setServerErrorMessage] = useState({
    name: '',
    email: '',
    companyName: '',
    password: '',
    passwordCheck: '',
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordCheck: false,
  });

  const onSubmit = async (data: TSignupInputs) => {
    try {
      const { passwordCheck, ...signupData } = data;
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      
      if (response.ok) {
        router.push('/login');
      } else {
        setServerErrorMessage(prev => ({
          ...prev,
          email: result.message
        }));
      }
    } catch (error) {
      setServerErrorMessage(prev => ({
        ...prev,
        email: '회원가입 중 오류가 발생했습니다.'
      }));
    }
  };

  const debounceValidate = useCallback(
    _.debounce(async (field: keyof TSignupInputs) => {
      await trigger(field);
    }, 1000),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const schemaShape = SignupSchema.innerType().shape;
    if (!Object.keys(schemaShape).includes(name)) return;
    debounceValidate(name as keyof TSignupInputs);
  };

  return (
    <div className="max-w-[340px] sm:max-w-[600px] xl:max-w-[510px] px-4 py-8 sm:px-14 sm:py-8 flex items-center justify-center flex-col bg-white rounded-3xl w-full">
      <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">이름</label>
          <input
            id="name"
            {...register('name', {
              onChange: handleChange,
            })}
            className={clsx(
              'w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
              {'border border-red-600': serverErrorMessage.name || errors.name?.message}
            )}
            placeholder="이름을 입력해주세요"
          />
          {errors.name?.message ? (
            <p className="text-sm font-semibold text-red-600">{errors.name.message}</p>
          ) : (
            serverErrorMessage.name && (
              <p className="text-sm font-semibold text-red-600">{serverErrorMessage.name}</p>
            )
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">아이디</label>
          <input
            id="email"
            {...register('email', {
              onChange: handleChange,
            })}
            className={clsx(
              'w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
              {'border border-red-600': serverErrorMessage.email || errors.email?.message}
            )}
            placeholder="이메일을 입력해주세요"
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
          <label htmlFor="companyName" className="text-sm font-semibold">회사명</label>
          <input
            id="companyName"
            {...register('companyName', {
              onChange: handleChange,
            })}
            className={clsx(
              'w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
              {'border border-red-600': serverErrorMessage.companyName || errors.companyName?.message}
            )}
            placeholder="회사명을 입력해주세요"
          />
          {errors.companyName?.message ? (
            <p className="text-sm font-semibold text-red-600">{errors.companyName.message}</p>
          ) : (
            serverErrorMessage.companyName && (
              <p className="text-sm font-semibold text-red-600">{serverErrorMessage.companyName}</p>
            )
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">비밀번호</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword.password ? 'text' : 'password'}
              {...register('password', {
                onChange: handleChange,
              })}
              className={clsx(
                'w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
                {'border border-red-600': serverErrorMessage.password || errors.password?.message}
              )}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prevState => ({
                ...prevState,
                password: !prevState.password
              }))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5"
            >
              {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
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

        <div className="space-y-2">
          <label htmlFor="passwordCheck" className="text-sm font-semibold">비밀번호 확인</label>
          <div className="relative">
            <input
              id="passwordCheck"
              type={showPassword.passwordCheck ? 'text' : 'password'}
              {...register('passwordCheck', {
                onChange: handleChange,
              })}
              className={clsx(
                'w-full px-4 py-2 rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
                {'border border-red-600': serverErrorMessage.passwordCheck || errors.passwordCheck?.message}
              )}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prevState => ({
                ...prevState,
                passwordCheck: !prevState.passwordCheck
              }))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5"
            >
              {showPassword.passwordCheck ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-[10px] bg-gray-400 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-base"
        >
          확인
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-800">
        이미 회원이신가요?{' '}
        <button
          onClick={() => router.push('/login')}
          className="text-orange-600 border-b border-transparent hover:border-orange-600 box-border hover:border-b font-medium transition duration-200"
        >
          로그인
        </button>
      </p>
    </div>
  );
}

