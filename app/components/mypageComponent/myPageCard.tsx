'use client';

import {useState} from 'react';

import Image from 'next/image';

import {useUserQuery} from '../../queries/user/useUserQueries';
import {GetJoinedGatherings} from '../../types/gatherings/joinedGatherings.types';
import formatDateUtil from '../../utils/formatDate';
import {RenderOverlay} from '../common/renderOverlay';
import {WriteReviewModal} from '../modals/writeReviewModal';

import {ActionButton} from './actionButton';
import {RenderChips} from './chipRender';

type MyPageCardProps = GetJoinedGatherings & {
  isMyGathering: boolean;
};

// TODO: 카드 누르면 해당 모임 상세페이지로 이동 기능 구현
/** 마이페이지 - 나의모임 card */
export function MyPageCard({
  id,
  name,
  dateTime,
  location,
  image,
  participantCount,
  capacity,
  canceledAt,
  isCompleted,
  isMyGathering,
  isReviewed,
}: MyPageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId = userInfo?.data?.id as number;

  function isCanceled() {
    if (canceledAt)
      return (
        <RenderOverlay message="모집 취소" height="[328px]" gatheringId={id} userId={userId} />
      );
    return null;
  }

  const dateFormat = formatDateUtil(dateTime);

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기 상태로 변경
  };

  return (
    <div className="relative flex h-[352px] w-[311px] max-w-[996px] flex-col justify-between sm:h-[180px] sm:w-full sm:flex-col">
      {/* 리뷰 작성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <WriteReviewModal onClose={() => setIsModalOpen(false)} gatheringId={id} />
        </div>
      )}

      {/* 모임 취소 오버레이 */}
      {isCanceled()}

      <div className="flex h-[328px] w-full flex-col justify-between sm:h-[156px] sm:w-[545px] sm:flex-row">
        {/* 모임 이미지 */}
        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-3xl border border-dashed sm:w-[280px]">
          <Image src={image || ''} alt="모임 대표 이미지" className="object-cover" layout="fill" />
        </div>

        <div className="flex h-full w-[249px] flex-col justify-between">
          {/* 상태 Chips */}
          <RenderChips
            isCompleted={isCompleted}
            participantCount={participantCount}
            isMyGathering={isMyGathering}
          />

          {/* 모임 정보 */}
          <div className="flex h-[54px] w-full flex-col justify-between">
            {/* 모임 이름, 장소 */}
            <div className="flex h-[28px] items-center justify-between">
              <div className="w-[170px] overflow-hidden truncate font-semibold">{name}</div>
              <div className="flex w-[76px] justify-between">
                <span className="font-semibold">|</span>
                <p className="text-sm font-medium">{location}</p>
              </div>
            </div>

            {/* 날짜, 참여 인원 */}
            <div className="flex h-[20px] w-[160px] justify-between text-sm">
              <span>{`${dateFormat.date} ${dateFormat.time}`}</span>
              <span className="flex gap-[4px]">
                <Image
                  src="icons/personIcon.svg"
                  className="pt-0.5"
                  alt="사람 아이콘"
                  width={16}
                  height={16}
                  unoptimized
                />
                {`${participantCount}/${capacity}`}
              </span>
            </div>
          </div>

          {/* 취소, 리뷰 버튼 */}
          <div className="mt-[12px] h-[40px]">
            <ActionButton
              gatheringId={id}
              isCompleted={isCompleted}
              isReviewed={isReviewed}
              onOpenModal={handleOpenModal}
              userId={userId}
            />
          </div>
        </div>
      </div>

      {/* 하단 점선 */}
      <div className="custom-dotted-line w-full" />
    </div>
  );
}
