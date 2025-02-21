import {serverInstance} from './client';

export const verifyToken = async (
  token: {name: string; value: string} | undefined,
): Promise<boolean> => {
  try {
    await serverInstance.get({path: '/auths/user', token: token?.value});
    return true;
  } catch (error) {
    console.log('토큰 유효성 검사 실패', error);
    return false;
  }
};
