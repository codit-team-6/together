// zod schema

import {z} from 'zod';

import {HOURS, MINUTES, PERIOD} from '../constants/calendar';
import {ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE} from '../constants/image';
import {LOCATIONS, TYPES} from '../constants/service';
import {TimeInfo} from '../types/common/time.types';

import {dateComparison, formatDateTimeForAPI} from './date';

// # Login Schema
export const LoginSchema = z.object({
  email: z.string().trim().min(1, '이메일을 입력해주세요').email({
    message: '유효한 이메일 주소를 입력하세요',
  }),
  password: z.string().trim().min(1, '비밀번호를 입력해주세요').min(8, {
    message: '비밀번호는 8자 이상이어야 합니다',
  }),
});

// # Signup Schema
export const SignupSchema = z
  .object({
    name: z.string().trim().min(1, '이름을 입력해주세요.'),
    email: z.string().trim().min(1, '이메일을 입력해주세요').email({
      message: '유효한 이메일 주소를 입력하세요',
    }),
    companyName: z.string().trim().min(1, '회사명을 입력해주세요.'),
    password: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      ),
    passwordCheck: z.string().trim().min(1, '비밀번호 확인란을 입력해주세요.'),
  })
  .refine(data => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

// # Create gathering schema
// ## 기본 타입들 정의
export const timeInfoSchema: z.ZodType<TimeInfo> = z.object({
  selectedDate: z.date(),
  selectedHour: z.enum(Object.values(HOURS) as [string, ...string[]]),
  selectedMinute: z.enum(Object.values(MINUTES) as [string, ...string[]]),
  selectedPeriod: z.enum(PERIOD),
});

const typeSchema = z.enum(TYPES);
const locationSchema = z.enum(LOCATIONS, {
  required_error: '위치를 선택해주세요',
});

// ## Create Gathering Form Schema 정의
// todo: registrationEnd에 대해 모임날짜에 대한 유효성 검증 로직 추가
// todo: image의 경우 바로 즉각적인 validation이 필요함
export const createGatheringSchema = z
  .object({
    name: z
      .string()
      .min(1, '모임 이름을 입력해주세요.')
      .max(20, '모임 이름은 20자 이내로 입력해주세요.'),
    location: locationSchema.refine(val => val !== undefined, '위치를 선택해주세요'),
    image: z
      .any()
      .refine(file => file instanceof File, '파일을 선택해주세요')
      .refine(file => file?.size <= MAX_FILE_SIZE, '파일 크기는 5MB 이하여야 합니다')
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file?.type as (typeof ACCEPTED_IMAGE_TYPES)[number]),
        '.jpeg, .jpg, .png, .webp, .gif, .svg 형식만 지원됩니다.',
      ),
    type: typeSchema,
    dateTime: timeInfoSchema.refine(time => {
      const dateTime = new Date(formatDateTimeForAPI(time));
      return dateTime > new Date();
    }, '모임 날짜는 현재 시간 이후여야 합니다.'),
    registrationEnd: timeInfoSchema.refine(time => {
      const registrationEnd = new Date(formatDateTimeForAPI(time));
      return registrationEnd > new Date();
    }, '마감 날짜는 현재 시간 이후여야 합니다.'),
    capacity: z
      .number({
        required_error: '모집 정원을 입력해주세요', // 값이 없을 때
        invalid_type_error: '모집 정원을 입력해주세요', // 초기 값이 Number(undefined)로 들어오기 때문에 발생하는 문제
      })
      .min(5, '최소 5명 이상의 정원이 필요합니다.')
      .max(100, '최대 100명까지 설정 가능합니다.'),
  })
  .refine(
    data => {
      const regEndDate = new Date(formatDateTimeForAPI(data.registrationEnd));
      const gatheringDate = new Date(formatDateTimeForAPI(data.dateTime));
      return dateComparison.isBefore(regEndDate, gatheringDate);
    },
    {
      message: '마감 날짜는 모임 날짜 이전이여야 합니다.',
      path: ['registrationEnd'], // path of error
    },
  );

export type GatheringFormSchema = z.infer<typeof createGatheringSchema>;
