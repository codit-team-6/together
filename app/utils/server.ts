import {GUEST_ONLY_PATH, PROTECTED_PATH} from '../constants/routing';
import {PageType, RequestType} from '../types/common/server.types';

export const getRequestType = (pathname: string): RequestType => {
  const firstPathName = pathname.split('/').filter(Boolean)[0];
  const secondPathName = pathname.split('/').filter(Boolean)[1];
  const firstPath = `/${firstPathName}`; // 슬래시를 추가하여 배열의 형식과 맞춤
  const secondPath = `/${secondPathName}`;

  if (firstPath === '/route' && secondPath === '/token') {
    return 'tokenApi';
  }

  if (PROTECTED_PATH.includes(firstPath)) {
    return 'protected';
  }

  if (GUEST_ONLY_PATH.includes(firstPath)) {
    return 'guestOnly';
  }

  return 'public';
};

export const isPageType = (typeName: RequestType): typeName is PageType => {
  if (typeName !== 'tokenApi') return true;
  return false;
};
