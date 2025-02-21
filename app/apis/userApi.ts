import {CodeitError} from '../types/common/error.types';
import {ApiResponse} from '../types/common/responseApi.types';
import {SignupData} from '../types/users/auth.types';
import {User} from '../types/users/user.types';

import {clientInstance, serverInstance} from './client';

// # Sign up
export async function signupUser(data: SignupData): Promise<void> {
  try {
    await clientInstance.post({
      path: '/route/auths/signup',
      body: data,
    });
  } catch (error) {
    if (error instanceof CodeitError) {
      console.error('요청 실패:', error.message);
      throw new Error(error.message || '회원가입 실패');
    }
    console.error('알 수 없는 오류:', error);
    throw new Error('회원가입 중 알 수 없는 오류가 발생했습니다.');
  }
}

// # Login
export const login = async (email: string, password: string) => {
  try {
    await clientInstance.post({
      path: '/route/auths/signin',
      body: {email, password},
    });
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
  }
};

export const deleteCookie = async () => {
  await clientInstance.delete({path: '/route/cookie'});
};

// # Get userInfo
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

// # Edit profile
export async function editProfile(formData: FormData): Promise<void> {
  try {
    await clientInstance.put({
      path: '/route/token/auths/editProfile',
      body: formData,
      contentType: 'formData',
    });
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    throw error;
  }
}
