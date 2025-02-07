import {GatheringParticipant} from '../../types/gatherings/GatheringParticipant';
import {GatheringsFilter, JoinedGatheringsFilter} from '../../types/gatherings/filters';
import {GetGatherings} from '../../types/gatherings/getGatherings.types';
import {GetJoinedGatherings} from '../../types/gatherings/joinedGatherings.types';
import createQueryString from '../../utils/createQueryString';
import {clientInstance, serverInstance} from '../client';

interface ApiResponse<T> {
  data: T;
  message: string;
}

// TODO: 에러처리 맞게 수정
export const getGatherings = async (filters: GatheringsFilter = {}): Promise<GetGatherings[]> => {
  try {
    const queryString = createQueryString(filters);

    const response = await clientInstance.get<ApiResponse<GetGatherings[]>>({
      path: `/route/gatherings/gathering?${queryString}`,
    });

    return response.data;
  } catch (error) {
    console.error('모임 목록 불러오는 중 에러 발생:', error);
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
    console.error('server-모임 목록 불러오는 중 에러 발생:', error);
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
    console.error('참여중인 모임 불러 오는 중 에러 발생:', error);
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
    console.error('server-참여중인 모임 불러 오는 중 에러 발생:', error);
    throw error;
  }
};

export const leaveJoinedGatherings = async (gatheringId: number, userId: number): Promise<void> => {
  try {
    await clientInstance.delete<GetJoinedGatherings[]>({
      path: `/route/token/gatherings/joinedGatherings?gatheringId=${gatheringId}&userId=${userId}`,
    });
  } catch (error) {
    console.error('모임 참여 취소 중 에러 발생:', error);
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
    console.error('server-모임 참여 취소 중 에러 발생: ', error);
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
    console.error('모임의 참여자 정보 불러오는 중 에러 발생:', error);
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
    console.error('server-모임의 참여자 정보 불러오는 중 에러 발생:', error);
    throw error;
  }
};
