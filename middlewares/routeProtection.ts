import {NextResponse} from 'next/server';

import {verifyToken} from '../app/apis/tokenApi';
import {RequestType} from '../app/types/common/server.types';

export const protectRoute = async (
  token: {name: string; value: string} | undefined,
  pageType: RequestType,
  requestUrl: string,
) => {
  const isValidToken = await verifyToken(token);

  if (isValidToken && pageType === 'guestOnly') {
    return NextResponse.redirect(new URL('/', requestUrl));
  }

  if (!isValidToken && pageType === 'protected') {
    return NextResponse.redirect(new URL('/login', requestUrl));
  }

  return NextResponse.next();
};
