import {cookies} from 'next/headers';
import {type NextRequest} from 'next/server';

import {AUTH_TOKEN} from './app/constants/service';
import {getRequestType, isPageType} from './app/utils/server';
import {handleApiRequest} from './middlewares/apiHandler';
import {protectRoute} from './middlewares/routeProtection';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN);

  const requestType = getRequestType(request.nextUrl.pathname);

  if (isPageType(requestType)) {
    return protectRoute(token, requestType, request.url);
  }

  return handleApiRequest(token, requestType);
}

// 변수로 선언하면 반영이 되지 않으니 주의!
export const config = {
  matcher: ['/login', '/signup', '/mypage', '/route/token'],
};
