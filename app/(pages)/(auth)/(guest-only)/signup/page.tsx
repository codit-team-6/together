'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {z} from 'zod';

import {signupUser} from '../../../../apis/userApi';
import InputField from '../../../../components/common/form/InputField';
import {CodeitError} from '../../../../types/common/error.types';
import {SignupSchema} from '../../../../utils/validation';

type SignupInputs = z.infer<typeof SignupSchema>;

export default function Signup() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('회원가입 성공');
      router.push('/login');
    },
    onError: error => {
      const message =
        error instanceof CodeitError && error.message
          ? error.message
          : '회원가입 중 문제가 발생했습니다.';
      toast.error(message);
    },
  });

  const {
    handleSubmit,
    formState: {errors},
    register,
  } = useForm<SignupInputs>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit: SubmitHandler<SignupInputs> = data => {
    const {passwordCheck, ...signupData} = data;
    mutation.mutate(signupData);
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 sm:max-w-[600px] sm:px-14 sm:py-8 xl:max-w-[510px]">
      <h1 className="mb-8 text-center text-2xl font-bold">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
        <InputField
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요"
          register={register}
          errorMessage={errors.name?.message}
        />
        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요"
          register={register}
          errorMessage={errors.email?.message}
        />
        <InputField
          label="회사명"
          name="companyName"
          placeholder="회사명을 입력해주세요"
          register={register}
          errorMessage={errors.companyName?.message}
        />
        <InputField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          isPassword
          register={register}
          errorMessage={errors.password?.message}
        />
        <div className="-mt-4 text-xs text-gray-600">
          <p>※ 비밀번호는 영문, 숫자, 특수문자가 포함된 8자 이상이 되도록 해 주세요.</p>
        </div>
        <InputField
          label="비밀번호 확인"
          name="passwordCheck"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          isPassword
          register={register}
          errorMessage={errors.passwordCheck?.message}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-400 py-[10px] text-base font-semibold text-white transition duration-200 hover:bg-gray-600"
        >
          확인
        </button>
      </form>
      <footer className="mt-6 flex justify-center text-center text-sm text-gray-800">
        <span>이미 회원이신가요?</span>
        <Link href="/login" className="text-orange-600 underline">
          로그인
        </Link>
      </footer>
    </div>
  );
}
