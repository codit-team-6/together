'use client';

import {useEffect} from 'react';

import {useAtom} from 'jotai';

import {getUserInfo} from './apis/user/userApi';
import LogoutButton from './components/logoutButton';
import {userInfoAtom} from './store/atoms/userAtoms';

// export const metadata: Metadata = {
//   title: '서비스 명',
//   description: '서비스 메인 페이지 설명',
// };

export default function Home() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  // const [, setToken] = useAtom(tokenWithStorageAtom);
  const fetchUserInfo = async () => {
    const userInfoData = await getUserInfo();
    setUserInfo(userInfoData);
  };
  useEffect(() => {
    // setToken(null); // api 요청시 token이 빠져있을 경우 테스트를 위한 코드
    fetchUserInfo();
  }, []);
  return (
    <div>
      {userInfo && <p>{userInfo.name}</p>}
      <p>메인 페이지</p>
      <LogoutButton />
    </div>
  );
}
