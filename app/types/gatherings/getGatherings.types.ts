import {Gathering, Locations} from './gatheringOptions.types';

export type GetGatherings = {
  id: number; // 모임 ID
  type: Gathering; // 모임 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜
  registrationEnd: string; // 모임 모집 마감일
  location: Locations; // 모임 위치
  participantCount: number; // 참여 인원
  capacity: number; // 모임 정원
  image: string; // 모임 대표 이미지
  createdBy: number; // 모임 생성자 ID
  canceledAt?: string | null; // 모임 취소일
};
