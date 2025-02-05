import Image from 'next/image';

import {GetJoinedGatherings} from '../../types/gatherings/joinedGatherings.types';
import isClosedUtil from '../../utils/isClosed';
import {ApproveCheck} from '../common/approveCheck';
import {DateTimeInfoChip} from '../common/chips/chip-info';
import {CloseTag} from '../common/chips/tag';
import {ProgressBar} from '../common/progressBar';
import {RenderOverlay} from '../common/renderOverlay';

export function ListCard({
  image,
  registrationEnd,
  participantCount,
  capacity,
  name,
  location,
  dateTime,
}: GetJoinedGatherings) {
  function isClose() {
    if (isClosedUtil(registrationEnd, participantCount, capacity)) {
      return <RenderOverlay message="모집 취소" height="full" gatheringId={0} />;
    }
    return null;
  }

  return (
    <div className="relative flex h-[316px] w-[343px] max-w-[996px] flex-col overflow-hidden rounded-3xl border-2 border-gray-100 bg-white sm:h-[156px] sm:w-full sm:flex-row">
      {/* 마감 오버레이 */}
      {isClose()}

      {/* 모임 이미지 */}
      <div className="relative flex h-[156px] w-[343px] items-center justify-center overflow-hidden sm:w-[280px]">
        <Image src={image} alt="모임 대표 이미지" className="object-cover" layout="fill" />
        <CloseTag registrationEnd={registrationEnd} />
      </div>

      {/* 모임 정보 */}
      <div className="relative h-[156px] w-full pl-2 sm:w-[716px] sm:pl-6">
        <button type="button" className="absolute right-5 top-5">
          <Image src="/emptyHeart.svg" alt="찜 버튼" width={48} height={48} unoptimized />
          {/* 기능 구현 필요함(찜하기) */}
        </button>

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

        {/* 모임 인원 정보 */}
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

        {/* 클릭 하면 상세페이지로 이동(구현X) */}
        <button
          type="button"
          className="absolute bottom-5 right-5 flex font-semibold text-orange-600"
        >
          <p>join now</p>
          <Image
            className="ml-2 mt-1"
            src="icons/arrowIcon.svg"
            alt="화살표 아이콘"
            width={18}
            height={18}
            unoptimized
          />
        </button>
      </div>
    </div>
  );
}
