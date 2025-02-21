'use client';

import {useQuery} from '@tanstack/react-query';

import {gatheringsQueryKey} from '../../../queries/common/queryKeys';
import {GatheringParticipant} from '../../../types/gatherings/GatheringParticipant.types';
import {GetGatherings} from '../../../types/gatherings/getGatherings.types';
import {ApproveCheck} from '../../common/approveCheck';
import {DateTimeInfoChip} from '../../common/chip-info';
import {LikeButton} from '../../common/likeButton';
import {ProgressBar} from '../../common/progressBar';
import {TextRender} from '../../common/textRender';

import {ParticipantIcons} from './participantIcons';

export function DetailCard({
  id,
  name,
  location,
  dateTime,
  capacity,
  participantCount,
}: GetGatherings) {
  const {
    data: participants = [],
    isLoading,
    isError,
  } = useQuery<GatheringParticipant[]>(gatheringsQueryKey.gatheringParticipants(id));

  return (
    <div className="flex h-[270px] w-[486px] items-center justify-center rounded-2xl bg-white">
      <div className="flex h-[222px] w-full flex-col items-center justify-center">
        <div className="flex h-[129px] w-full justify-center border-b-2 border-dashed border-gray-200">
          <div className="relative flex h-[86px] w-[438px] flex-col">
            <LikeButton gatheringId={id} />
            <div className="h-[28px] w-[390px] text-lg font-semibold">
              <p>{name}</p>
            </div>
            <div className="h-[20px] w-[390px] text-sm font-medium">{location}</div>
            <div className="mt-[14px] h-[24px] w-[390px]">
              <DateTimeInfoChip dateTime={dateTime} />
            </div>
          </div>
        </div>
        <div className="mt-[24px] flex h-[69px] w-[438px] flex-col">
          {isLoading && <TextRender effect="bounce" text="로딩중..." />}
          {isError && <TextRender effect="shake" text="참여자 정보를 불러오지 못했습니다." />}
          {!isLoading && !isError && (
            <>
              <div className="relative flex h-[29px] w-full items-center text-sm font-semibold">
                <p>{`참여 ${participantCount}명`}</p>
                <ParticipantIcons participants={participants} />
                <div className="absolute bottom-0 right-0 h-[24px] text-sm font-medium">
                  {ApproveCheck(participantCount)}
                </div>
              </div>
              <div className="mt-[12px] h-[4px] w-full">
                {ProgressBar(participantCount, capacity)}
              </div>
              <div className="relative mt-[8px] flex h-[16px] w-full items-center text-xs font-medium">
                <p>최소인원 5명</p>
                <p className="absolute right-0">{`모집정원 ${capacity}명`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
