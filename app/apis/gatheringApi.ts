import {CodeitError} from '../types/common/error.types';
import {GatheringsFilter, JoinedGatheringsFilter} from '../types/common/filters.types';
import {ApiResponse} from '../types/common/responseApi.types';
import {GatheringParticipant} from '../types/gatherings/GatheringParticipant.types';
import {CreateGatheringResponseData} from '../types/gatherings/createGathering.types';
import {GatheringDetailType} from '../types/gatherings/getGatheringDetail.types';
import {GetGatherings} from '../types/gatherings/getGatherings.types';
import {
  GetJoinedGatherings,
  PostJoinGatheringResponse,
} from '../types/gatherings/joinedGatherings.types';
import createQueryString from '../utils/createQueryString';

import {clientInstance, serverInstance} from './client';

// TODO: 에러처리 맞게 수정
export const getGatherings = async (filters: GatheringsFilter = {}): Promise<GetGatherings[]> => {
  try {
    const queryString = createQueryString(filters);

    const response = await clientInstance.get<ApiResponse<GetGatherings[]>>({
      path: `/route/gatherings/gathering?${queryString}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGatheringsInServer = async (
  filters: GatheringsFilter = {},
): Promise<GetGatherings[]> => {
  try {
    const defaultParams = {
      sortBy: 'dateTime',
      sortOrder: 'asc',
      ...filters,
    };

    const queryString = createQueryString(defaultParams);

    const response = await serverInstance.get<GetGatherings[]>({
      path: `/gatherings?${queryString}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJoinedGatherings = async (
  filters: JoinedGatheringsFilter = {},
): Promise<GetJoinedGatherings[]> => {
  try {
    const queryString = createQueryString(filters);

    const response = await clientInstance.get<ApiResponse<GetJoinedGatherings[]>>({
      path: `/route/token/gatherings/joinedGatherings?${queryString}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJoinedGatheringsInServer = async (
  token: string,
  filters: JoinedGatheringsFilter = {},
): Promise<GetJoinedGatherings[]> => {
  try {
    const defaultParams = {
      sortBy: 'dateTime',
      sortOrder: 'asc',
      ...filters,
    };

    const queryString = createQueryString(defaultParams);

    const response = await serverInstance.get<GetJoinedGatherings[]>({
      path: `/gatherings/joined?${queryString}`,
      token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const leaveJoinedGatherings = async (gatheringId: number, userId: number): Promise<void> => {
  try {
    await clientInstance.delete<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/joinedGatherings?gatheringId=${gatheringId}&userId=${userId}`,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteLeaveGathering = async (id: number): Promise<void> => {
  try {
    await clientInstance.delete<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/${id}`,
    });
  } catch (error) {
    throw error;
  }
};

export const leaveJoinedGatheringsInServer = async (
  token: string,
  gatheringId: number,
): Promise<void> => {
  try {
    await serverInstance.delete({
      path: `/gatherings/${gatheringId}/leave`,
      token,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserFromGathering = async (
  gatheringId: number,
): Promise<GatheringParticipant[]> => {
  try {
    const response = await clientInstance.get<ApiResponse<GatheringParticipant[]>>({
      path: `/route/gatherings/gatheringParticipant?gatheringId=${gatheringId}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFromGatheringInServer = async (
  gatheringId: number,
): Promise<GatheringParticipant[]> => {
  try {
    const response = await serverInstance.get<GatheringParticipant[]>({
      path: `/gatherings/${gatheringId}/participants`,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const postJoinGathering = async (id: number): Promise<PostJoinGatheringResponse> => {
  try {
    const response = await clientInstance.post<PostJoinGatheringResponse>({
      path: `/route/token/gatherings/${id}`,
      body: {id},
    });

    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 실패');
  }
};

export const postJoinGatheringInServer = async (
  token: string,
  id: number,
): Promise<PostJoinGatheringResponse> => {
  console.log(`postJoinGatheringInServer 서버 요청 시작 - ID: ${id}`);
  try {
    const response = await serverInstance.post<PostJoinGatheringResponse>({
      path: `/gatherings/${id}/join`,
      token,
    });
    console.log(`postJoinGatheringInServer 요청 성공 - ID: ${id}, 응답:`, response);
    return response;
  } catch (error) {
    console.error(`postJoinGatheringInServer 요청 실패 - ID: ${id}`, error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 중 오류 발생');
  }
};

export const getGatheringDetail = async (id: number): Promise<GatheringDetailType> => {
  try {
    const response = await clientInstance.get<GatheringDetailType>({
      path: `/route/gatherings/${id}`,
    });
    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 상세 정보 가져오기 실패');
  }
};

export const putCancelGathering = async (id: number): Promise<{message: string}> => {
  try {
    const response = await clientInstance.put<{message: string}>({
      path: `/route/token/gatherings/${id}`,
      body: {id},
    });
    console.log('클라이언트에서 받은 모임 취소 응답:', response);
    return response;
  } catch (error) {
    console.error('현재 error 객체:', error);
    throw new Error(error instanceof Error ? error.message : '모임 취소 실패');
  }
};

export const putCancelGatheringInServer = async (
  token: string,
  id: number,
): Promise<{message: string}> => {
  console.log(`putCancelGatheringInServer 서버 요청 시작 - ID: ${id}`);
  try {
    const response = await serverInstance.put<{message: string}>({
      path: `/gatherings/${id}/cancel`,
      token,
    });
    console.log(`putCancelGatheringInServer 요청 성공 - ID: ${id}`, response);
    return response; // ✅ 응답 메시지 반환
  } catch (error) {
    console.error(`putCancelGatheringInServer 요청 실패 - ID: ${id}`, error);
    throw new Error(error instanceof Error ? error.message : '모임 참여 요청 중 오류 발생');
  }
};

// # Create gathering
export const createGathering = async (
  createGatheringFormData: FormData,
): Promise<CreateGatheringResponseData | undefined> => {
  try {
    const response = await clientInstance.post<CreateGatheringResponseData>({
      path: '/route/token/gatherings',
      body: createGatheringFormData,
      contentType: 'formData',
    });

    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    return undefined;
  }
};
