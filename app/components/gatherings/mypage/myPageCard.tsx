'use client';

import {useState} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {useUserQuery} from '../../../queries/user/useUserQuries';
import {GetJoinedGatherings} from '../../../types/gatherings/joinedGatherings.types';
import {formatISODate} from '../../../utils/date';
import {WriteReviewModal} from '../../common/modal/writeReviewModal';
import {RenderOverlay} from '../../common/renderOverlay';

import {ActionButton} from './actionButton';
import {RenderChips} from './chipRender';

type MyPageCardProps = GetJoinedGatherings & {
  isMyGathering: boolean;
};

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

  const {getMyInfo} = useUserQuery();
  const {data: userInfo} = getMyInfo();
  const userId = userInfo?.data?.id as number;

  const route = useRouter();

  function isCanceled() {
    if (canceledAt)
      return (
        <RenderOverlay message="모집 취소" height="[328px]" gatheringId={id} userId={userId} />
      );
    return null;
  }

  const dateFormat = formatISODate(dateTime);

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기 상태로 변경
  };

  const handleCardClick = () => {
    route.push(`/gatherings/${id}`);
  };

  return (
    <div className="relative flex h-[352px] w-[311px] max-w-[996px] flex-col justify-between sm:h-[180px] sm:w-full sm:flex-col">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <WriteReviewModal onClose={() => setIsModalOpen(false)} gatheringId={id} />
        </div>
      )}

      {isCanceled()}

      <div className="flex h-[328px] w-full flex-col justify-between sm:h-[156px] sm:w-[545px] sm:flex-row">
        <button
          type="button"
          onClick={handleCardClick}
          className="relative flex size-full items-center justify-center overflow-hidden rounded-3xl border border-dashed sm:w-[280px]"
        >
          <Image src={image || ''} alt="모임 대표 이미지" className="object-cover" layout="fill" />
        </button>

        <div className="flex h-full w-[249px] flex-col justify-between">
          <RenderChips
            isCompleted={isCompleted}
            participantCount={participantCount}
            isMyGathering={isMyGathering}
          />

          <div className="flex h-[54px] w-full flex-col justify-between">
            <div className="flex h-[28px] items-center justify-between">
              <button
                type="button"
                onClick={handleCardClick}
                className="w-[170px] overflow-hidden truncate font-semibold"
              >
                {name}
              </button>

              <div className="flex w-[76px] justify-between">
                <span className="font-semibold">|</span>
                <p className="text-sm font-medium">{location}</p>
              </div>
            </div>

            <div className="ml-[8px] flex h-[20px] w-[160px] justify-between text-sm">
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

      <div className="custom-dotted-line w-full" />
    </div>
  );
}
