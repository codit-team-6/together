import {GetGatherings} from './getGatherings.types';

export type GetJoinedGatherings = GetGatherings & {
  isCompleted: boolean; // 모임 완료 여부
  isReviewed: boolean; // 리뷰 작성 여부
};

export type PostJoinGatheringResponse = {
  code?: string;
  message: string;
};
