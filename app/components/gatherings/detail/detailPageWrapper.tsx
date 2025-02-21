'use client';

import {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';

import {getGatheringDetail, getJoinedGatherings} from '../../../apis/gatheringApi';
import {getGatheringReviews} from '../../../apis/reviewsApi';
import {gatheringsQueryKey} from '../../../queries/common/queryKeys';
import {useUserQuery} from '../../../queries/user/useUserQuries';
import {Gathering, Locations} from '../../../types/gatherings/gatheringOptions.types';
import {ReviewListType} from '../../../types/reviews/reviews.types';
import Pagination from '../../common/pagination';
import ReviewListWrapper from '../../reviews/reviewCardList';
import BottomBar from '../bottomBar';

import {DetailCard} from './detailCard';

type DetailPageWrapperProps = {
  gatheringId: number;
  initialReviews: ReviewListType;
};

export default function DetailPageWrapper({gatheringId, initialReviews}: DetailPageWrapperProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isDeadlineApproaching, setIsDeadlineApproaching] = useState(false);
  const [deadLine, setDeadline] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFinishedGathering, setIsFinishedGathering] = useState(false);
  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId = userInfo?.data?.id as number;
  const {data: gatheringReviewList} = useQuery({
    queryKey: ['gatheringReviews', gatheringId, currentPage],
    queryFn: () =>
      getGatheringReviews({
        gatheringId,
        sortOrder: 'desc',
        limit: 10,
        offset: (currentPage - 1) * 10,
      }),
    initialData: currentPage === 1 ? initialReviews : undefined,
    placeholderData: previousData =>
      previousData ?? {data: [], totalItemCount: 0, currentPage: 1, totalPages: 1},
  });

  const reviews = gatheringReviewList ?? {
    data: [],
    totalItemCount: 0,
    currentPage: 1,
    totalPages: 1,
  };
  const {data: gatheringDetail, isError} = useQuery({
    queryKey: gatheringsQueryKey.GatheringDetails(gatheringId),
    queryFn: () => getGatheringDetail(gatheringId),
    staleTime: 0,
  });
  const gatheringOwner = gatheringDetail?.createdBy;
  const {data: joinedGatherings} = useQuery({
    queryKey: gatheringsQueryKey.joinedGatherings().queryKey,
    queryFn: () => getJoinedGatherings(),
    enabled: !!userId,
  });

  const checkFull = () => {
    if (gatheringDetail) {
      const {capacity, participantCount} = gatheringDetail;
      setIsFull(capacity === participantCount);
    }
  };

  const checkParticipated = () => {
    if (joinedGatherings) {
      setIsParticipated(joinedGatherings.some(item => Number(item.id) === Number(gatheringId)));
    }
  };

  useEffect(() => {
    if (!userId) return;
    checkFull();
    checkParticipated();
    setIsOwner(userId === gatheringOwner);
    setIsLogin(true);
  }, [userId, gatheringOwner, joinedGatherings, gatheringDetail]);

  const getHoursDifference = (timestamp: string): number => {
    const EndDate = new Date(timestamp);
    setDeadline(String(EndDate.getHours()));
    const currentDate = new Date();
    return (EndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
  };

  useEffect(() => {
    if (!gatheringDetail?.registrationEnd) return;
    const res = getHoursDifference(gatheringDetail.registrationEnd);
    const checkDeadline = () => {
      if (res > 0 && res < 24) {
        setIsDeadlineApproaching(true);
      } else if (res < 0) {
        setIsFinishedGathering(true);
        setIsDeadlineApproaching(false);
      } else {
        setIsDeadlineApproaching(false);
      }
    };

    checkDeadline();
  }, [gatheringDetail?.registrationEnd]);

  if (isError) {
    return <div>모임을 찾을 수 없습니다</div>;
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-center gap-4 md:mb-[21px] md:flex-row md:justify-center md:gap-[14px] lg:mb-6 lg:gap-6">
        <div className="relative h-[180px] w-[343px] rounded-3xl border-2 border-gray-200 md:h-60 md:w-[340px] lg:h-[270px] lg:w-[486px] lg:gap-6">
          {gatheringDetail?.image ? (
            <Image src={gatheringDetail.image} alt="모임 이미지" fill className="rounded-3xl" />
          ) : (
            <div className="size-full rounded-3xl bg-gray-800" />
          )}
          {isDeadlineApproaching ? (
            <div className="absolute right-0 top-0 flex h-8 w-[123px] items-center gap-[2px] rounded-bl-xl rounded-tr-3xl bg-orange-600 py-1 pl-[7px]">
              <Image src="/icons/watch.svg" alt="시계 아이콘" width={24} height={24} />
              <div className="text-xs text-white">{`오늘 ${deadLine}시 마감`}</div>
            </div>
          ) : (
            ''
          )}
        </div>
        {gatheringDetail ? (
          <div className="rounded-3xl outline outline-2 outline-gray-200">
            <DetailCard
              id={gatheringDetail?.id}
              name={gatheringDetail?.name}
              dateTime={gatheringDetail?.dateTime}
              location={gatheringDetail?.location as Locations}
              participantCount={gatheringDetail?.participantCount}
              capacity={gatheringDetail?.capacity}
              type={gatheringDetail?.type as Gathering}
              registrationEnd={gatheringDetail?.registrationEnd}
              image={gatheringDetail?.image}
              createdBy={gatheringDetail?.createdBy}
            />
          </div>
        ) : (
          <div className="h-60 w-[343px] rounded-3xl border border-gray-600 md:w-[340px] lg:h-[270px] lg:w-[486px]">
            <div>로딩중...</div>
          </div>
        )}
      </div>

      <div className="border-t-2 border-t-gray-200 px-6 pt-6">
        <div className="mb-[10px] font-semibold text-gray-900 tablet:text-lg md:mb-4">
          이용자들은 이 프로그램을 이렇게 느꼈어요!
        </div>

        {reviews.data.length > 0 ? (
          <>
            <ReviewListWrapper {...reviews} />
            <Pagination
              currentPage={currentPage}
              totalPages={reviews.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p className="py-8 text-center text-gray-500">등록된 리뷰가 없습니다.</p>
        )}
      </div>

      <div>
        <BottomBar
          isLogin={isLogin}
          isOwner={isOwner}
          isParticipated={isParticipated}
          setIsParticipated={setIsParticipated}
          isFull={isFull}
          isCancel={gatheringDetail?.canceledAt}
          isFinishedGathering={isFinishedGathering}
          gatheringId={gatheringDetail?.id}
        />
      </div>
    </>
  );
}
