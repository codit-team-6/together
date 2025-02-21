'use client';

import {useState} from 'react';

import Image from 'next/image';

import {useUserQuery} from '../../queries/user/useUserQuries';
import {EditProfileModal} from '../common/modal/editProfileModal';
import {TextRender} from '../common/textRender';

export function ProfileLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {getMyInfo} = useUserQuery();
  const {data: userInfoResponse, isLoading, isError} = getMyInfo();

  const userInfo = userInfoResponse?.data;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <TextRender effect="bounce" text="로딩중..." />;
  }

  if (isError || !userInfo) {
    return <TextRender effect="shake" text="사용자 정보를 불러오지 못했습니다." />;
  }

  return (
    <div className="relative flex h-[178px] min-w-[343px] max-w-[996px] flex-col overflow-hidden rounded-3xl border-2 border-gray-200 bg-white">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <EditProfileModal
            onClose={handleCloseModal}
            image={userInfo.image}
            companyName={userInfo.companyName}
          />
        </div>
      )}

      <div className="absolute left-[24px] right-[18px] top-[54px] z-10 size-[56px] bg-none">
        <Image
          src={userInfo.image || 'icons/defaultProfileIcon.svg'}
          alt="프로필 이미지"
          layout="fill"
          className="rounded-full"
        />
      </div>

      <div className="relative flex h-[66px] w-full bg-orange-400">
        <p className="ml-[24px] mt-[15px] text-lg font-semibold">내 프로필</p>
        <button type="button" aria-label="Edit Profile" onClick={handleOpenModal}>
          <Image
            src="icons/editIcon.svg"
            className="absolute right-[18px] top-[18px] z-10"
            alt="수정 아이콘"
            width={32}
            height={32}
            unoptimized
          />
        </button>
        <Image
          src="icons/profileBar.svg"
          className="absolute left-[60%] mt-[13px] -translate-x-1/2 md:left-[70%]"
          alt="프로필 상단 이미지"
          width={156}
          height={46}
          unoptimized
        />
        <div className="absolute mt-[60px] w-full border border-orange-600" />
      </div>

      <div className="ml-[92px] mt-[15px] flex h-[77px] w-[240px] flex-col">
        <p>{userInfo.name}</p>
        <div className="mt-[9px] flex h-[44px] w-full flex-col justify-between text-sm">
          <p>{`company. ${userInfo.companyName}`}</p>
          <p className="">{`E-mail.  ${userInfo.email}`}</p>
        </div>
      </div>
    </div>
  );
}
