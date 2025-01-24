'use client';

import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {z} from 'zod';

import {signupUser} from '../../apis/user/signupApi';
import InputField from '../../components/InputField';
import {SignupSchema} from '../../utils/schema';

type SignupInputs = z.infer<typeof SignupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('회원가입 성공');
      router.push('/login');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
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
          label="아이디"
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
    </div>
  );
}
