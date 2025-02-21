'use client';

import {useMemo} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {useUserQuery} from '../../../queries/user/useUserQuries';
import {GetGatherings} from '../../../types/gatherings/getGatherings.types';
import {isClosed} from '../../../utils/isClosed';
import {ApproveCheck} from '../../common/approveCheck';
import {DateTimeInfoChip} from '../../common/chip-info';
import {LikeButton} from '../../common/likeButton';
import {ProgressBar} from '../../common/progressBar';
import {RenderOverlay} from '../../common/renderOverlay';
import {CloseTag} from '../../common/tag';

export function ListCard({
  id,
  image,
  registrationEnd,
  participantCount,
  capacity,
  name,
  location,
  dateTime,
  canceledAt,
}: GetGatherings) {
  const {data: userInfo} = useUserQuery().getMyInfo();
  const userId = userInfo?.data?.id as number;

  const route = useRouter();

  const isClose = useMemo(() => {
    if (isClosed(registrationEnd, participantCount, capacity)) {
      return <RenderOverlay message="모집 마감" height="full" gatheringId={id} userId={userId} />;
    }
    if (canceledAt) {
      return (
        <RenderOverlay message="모집 취소" height="[328px]" gatheringId={id} userId={userId} />
      );
    }
    return null;
  }, [registrationEnd, participantCount, capacity, canceledAt, id, userId]);

  function joinNowButton() {
    route.push(`/gatherings/${id}`);
  }

  return (
    <div className="relative flex h-[316px] w-[343px] max-w-[996px] flex-col overflow-hidden rounded-3xl border-2 border-gray-100 bg-white sm:h-[156px] sm:w-full sm:flex-row">
      {isClose}
      <div className="relative flex h-[156px] w-[343px] items-center justify-center overflow-hidden sm:w-[280px]">
        <Image src={image || ''} alt="모임 대표 이미지" className="object-cover" fill />
        <CloseTag registrationEnd={registrationEnd} />
      </div>

      <div className="relative h-[156px] w-full pl-2 sm:w-[716px] sm:pl-6">
        <LikeButton gatheringId={id} />

        <div className="flex h-[96px] items-center">
          <div className="flex h-[60px] w-[270px] flex-col">
            <div className="flex">
              <p className="mt-0.5 w-[180px] overflow-hidden truncate font-semibold">{name}</p>
              <span className="mx-1 font-semibold">|</span>
              <p className="mt-1.5 text-xs font-medium">{location}</p>
            </div>
            <div className="mt-2">
              <DateTimeInfoChip dateTime={dateTime} />
            </div>
          </div>
        </div>

        <div className="h-[60px] max-w-[calc(100%-120px)]">
          <div className="flex h-1/2 w-full">
            <span className="mt-1 flex gap-[4px]">
              <Image
                src="icons/personIcon.svg"
                className="mt-1 size-4"
                alt="참여자 아이콘"
                width={16}
                height={16}
                unoptimized
              />
              {`${participantCount}/${capacity}`}
            </span>
            {ApproveCheck(participantCount)}
          </div>
          <div className="flex h-2 w-full items-center">
            {ProgressBar(participantCount, capacity)}
          </div>
        </div>

        <button
          type="button"
          className="absolute bottom-5 right-5 flex font-semibold text-orange-600"
          onClick={joinNowButton}
        >
          <p>join now</p>
          <Image
            className="ml-2 mt-1"
            src="icons/arrowIcon.svg"
            alt="join now"
            width={18}
            height={18}
            unoptimized
          />
        </button>
      </div>
    </div>
  );
}
