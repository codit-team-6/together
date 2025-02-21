'use client';

import {useState} from 'react';

import {FilterTab} from '../../components/gatherings/mypage/filterTab';
import {MyGatherings} from '../../components/gatherings/mypage/myGatherings';
import {TabNavigation} from '../../components/gatherings/mypage/tabNavigation';
import {ProfileLayout} from '../../components/users/profileCard';
import {ReviewedGatheringFilter} from '../../types/gatherings/gatheringOptions.types';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<ReviewedGatheringFilter>('myGatherings');

  // 작성 가능 리뷰 / 작성 한 리뷰 데이터 구분용
  // reviewed에 따라 MyGatherings에서 데이터 불러 올 때 해당 데이터를 불러옴
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="flex w-full min-w-[375px] max-w-screen-desktop flex-col items-center justify-center bg-gray-50 px-[16px] py-[24px] md:px-[24px]">
      <h2 className="w-full max-w-[996px] text-left text-2xl font-semibold text-gray-900">
        마이 페이지
      </h2>
      <div className="mt-[24px] h-[178px] w-full max-w-[996px]">
        <ProfileLayout />
      </div>
      <div className="min-w-sm mt-[30px] flex w-full max-w-[996px] flex-col items-start justify-start border-t-2 border-gray-900 bg-white sm:min-h-[720px]">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <FilterTab activeTab={activeTab} reviewed={reviewed} setReviewed={setReviewed} />
        <div className="relative mt-[24px] flex w-full flex-col items-center justify-center gap-[24px] px-[24px]">
          <MyGatherings activeTab={activeTab} reviewed={reviewed} />
        </div>
      </div>
    </div>
  );
}
