import {NextResponse} from 'next/server';

import {RequestType} from '../app/types/common/server.types';

export const handleApiRequest = async (
  token: {name: string; value: string} | undefined,
  requestType: RequestType,
) => {
  if (requestType === 'tokenApi' && (token === undefined || !!token.value)) {
    return NextResponse.json(
      {message: '잘못된 인증 정보 입니다.', code: 'INVALID_TOKEN'},
      {status: 401},
    );
  }

  return NextResponse.next();
};
