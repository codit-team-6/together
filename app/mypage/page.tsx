'use client';

import {useEffect, useState} from 'react';

import {getJoinedGatherings} from '../apis/gatherings/gatheringApi';
import {getUserInfo} from '../apis/user/userApi';
import {MyPageCard} from '../components/mypageComponent/myPageCard';
import {ProfileLayout} from '../components/profileComponent/profileLayout';
import {GetJoinedGatherings} from '../types/gatherings/joinedGatherings.types';

export default function MyPage() {
  const [userId, setUserId] = useState<number>(0);
  const [joinedGatherings, setJoinedGatherings] = useState<GetJoinedGatherings[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState<'myGatherings' | 'myReviews' | 'createdGatherings'>(
    'myGatherings',
  );
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setIsError(false);

        const response = await getUserInfo();

        if (response) {
          setUserId(response.id);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchGatherings = async () => {
      setIsLoading(true);
      try {
        const response = (await getJoinedGatherings()) as unknown as {data: GetJoinedGatherings[]};

        const data = await response.data;

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        const now = new Date();
        const sortedData = data.sort((a, b) => {
          if (a.canceledAt && !b.canceledAt) return 1;
          if (!a.canceledAt && b.canceledAt) return -1;

          const aIsPast = new Date(a.registrationEnd) < now;
          const bIsPast = new Date(b.registrationEnd) < now;
          if (aIsPast && !bIsPast) return 1;
          if (!aIsPast && bIsPast) return -1;

          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;

          return 0;
        });

        setJoinedGatherings(sortedData);
        setIsError(false);
      } catch (error) {
        // console.error('Error fetching gatherings:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGatherings();
  }, []);

  if (isLoading) {
    return <div className="pt-10 text-center">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="pt-10 text-center text-orange-600">데이터를 불러오는 데 실패했습니다.</div>
    );
  }

  const tabOptions = [
    {key: 'myGatherings', label: '나의 모임'},
    {key: 'myReviews', label: '나의 리뷰'},
    {key: 'createdGatherings', label: '내가 만든 모임'},
  ];

  const renderButton = () => {
    if (activeTab !== 'myReviews') {
      return null;
    }

    return (
      <div className="ml-[24px] mt-[16px] flex h-[40px] w-[228px] gap-[8px]">
        <button
          type="button"
          className={`h-[40px] w-[124px] rounded-xl text-xs font-medium ${
            !reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          }`}
          onClick={() => setReviewed(false)}
        >
          작성 가능한 리뷰
        </button>
        <button
          type="button"
          className={`h-[40px] w-[96px] rounded-xl text-xs font-medium ${
            reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          }`}
          onClick={() => setReviewed(true)}
        >
          작성한 리뷰
        </button>
      </div>
    );
  };

  const renderContents = () => {
    const getComment = () => {
      switch (activeTab) {
        case 'myGatherings':
          return '신청한 ';
        case 'myReviews':
          return '리뷰 작성 가능한 ';
        case 'createdGatherings':
          return '아직 만든 ';
        default:
          return '';
      }
    };

    // todo: api 요청 단계에서 필터링으로 리팩토링
    const filteredGatherings = (() => {
      if (!joinedGatherings || joinedGatherings.length === 0) {
        return [];
      }

      switch (activeTab) {
        case 'myGatherings':
          return joinedGatherings;
        case 'myReviews':
          return joinedGatherings.filter(
            gathering => gathering.isCompleted && gathering.isReviewed === reviewed,
          );
        case 'createdGatherings':
          return joinedGatherings.filter(gathering => gathering.createdBy === userId);
        default:
          return [];
      }
    })();

    if (filteredGatherings.length === 0) {
      return (
        <div className="absolute left-1/2 top-[180px] h-[20px] w-[220px] -translate-x-1/2">
          <p className="text-sm font-medium text-gray-500">{getComment()}모임이 없어요.</p>
        </div>
      );
    }

    return filteredGatherings.map(joinedGathering => (
      <MyPageCard
        key={joinedGathering.id}
        {...joinedGathering}
        isMyGathering={activeTab === 'myGatherings'}
      />
    ));
  };

  return (
    <div className="flex w-full min-w-[375px] max-w-screen-desktop flex-col items-center justify-center bg-gray-50 px-[16px] py-[24px] md:px-[24px]">
      <h2 className="w-full max-w-[996px] text-left text-2xl font-semibold text-gray-900">
        마이 페이지
      </h2>
      <div className="mt-[24px] w-full max-w-[996px]">
        <ProfileLayout />
      </div>
      <div className="min-w-sm mt-[30px] flex w-full max-w-[996px] flex-col items-start justify-start border-t-2 border-gray-900 bg-white sm:min-h-[720px]">
        <div className="ml-[24px] mt-[24px] flex h-[34px] w-[300px] gap-[12px] text-gray-400">
          {tabOptions.map(tab => (
            <button
              type="button"
              key={tab.key}
              className={`text-sm font-semibold ${
                activeTab === tab.key ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {renderButton()}
        <div className="relative mt-[24px] flex w-full flex-col items-center justify-center gap-[24px] px-[24px]">
          {renderContents()}
        </div>
      </div>
    </div>
  );
}
