import {FieldError, FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form';

import {LOCATIONS, SERVICE_TYPES} from '../../constants/service';
import {GatheringFormSchema} from '../../utils/validation';
import {TimeInfo} from '../common/time.types';
import {ValueOf} from '../utils/util.types';

export type ServiceType = ValueOf<typeof SERVICE_TYPES>;
export type LocationType = (typeof LOCATIONS)[number];

export type CreateGathering = {
  location: LocationType | null;
  type: ServiceType;
  name: string;
  dateTime: string; // YYYY-MM-DDTHH:MM:SS
  capacity: number | null;
  image: File | null;
  registrationEnd: string; // YYYY-MM-DDTHH:MM:SS
};

export type CreateGatheringFormData = {
  location: LocationType;
  type: ServiceType;
  name: string;
  dateTime: string; // YYYY-MM-DDTHH:MM:SS
  capacity: number;
  image: File;
  registrationEnd: string; // YYYY-MM-DDTHH:MM:SS
};

export type ErrorMessageType = {
  [K in keyof GatheringFormSchema]: string;
};

export type InputProps<T> = {
  value: T;
  onChange: (value: T) => void;
  error?: string;
};

export type UnControlledInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  registerKey: keyof T;
  label: string;
  error?: string;
};

export type SelectItem = {value: (typeof LOCATIONS)[number]; label: (typeof LOCATIONS)[number]};
export type SelectProps = InputProps<string | null> & {
  options: SelectItem[];
};

export type DateTimePickerProps = InputProps<TimeInfo> & {
  label: string;
  error?: FieldError | FieldErrorsImpl<TimeInfo>;
};

// todo: getGatherings랑 정리 필요
export type CreateGatheringResponseData = {
  data: {
    teamId: string; // 팀 ID
    id: number; // 모임의 고유 ID
    type: 'OFFICE_STRETCHING' | 'ONLINE' | 'OFFLINE'; // 모임의 유형 (예: 'OFFICE_STRETCHING', 'ONLINE', 'OFFLINE' 등)
    name: string; // 모임의 이름
    dateTime: string; // 모임의 날짜 및 시간 (ISO 8601 형식)
    registrationEnd: string; // 등록 마감 시간 (ISO 8601 형식)
    location: string; // 모임의 위치
    participantCount: number; // 참가자 수
    capacity: number; // 최대 수용 인원
    image: string | null; // 모임 이미지 URL (null일 수 있음)
    createdBy: number; // 모임 생성자의 사용자 ID
    canceledAt: string | null; // 모임 취소 시간 (null일 수 있음)
  };
  message: string;
};
