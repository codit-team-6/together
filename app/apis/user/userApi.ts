import {User} from '../../store/types/user.types';
import {CodeitError} from '../../types/error.types';
import {clientInstance, serverInstance} from '../client';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const login = async (email: string, password: string) => {
  try {
    await clientInstance.post({path: '/route/auths/signin', body: {email, password}});
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
  }
};

export const deleteCookie = async () => {
  await clientInstance.delete({path: '/route/cookie'});
};

export const getUserInfo = async (): Promise<ApiResponse<User> | undefined> => {
  try {
    // ApiResponse<User> 타입을 적용하여 응답을 받아옵니다.
    const userInfoData = await clientInstance.get<ApiResponse<User>>({
      path: '/route/token/auths/user',
    });
    return userInfoData;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    return undefined;
  }
};

export const getUserInfoInServer = async (
  token?: string,
): Promise<ApiResponse<User> | undefined> => {
  try {
    const userInfoData = await serverInstance.get<ApiResponse<User>>({path: '/auths/user', token});
    return userInfoData;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    return undefined;
  }
};
