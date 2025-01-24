'use client';

import Image from 'next/image';

import {leaveJoinedGatherings} from '../../apis/gatherings/gatheringApi';

/** 모임 취소, 마감 오버레이 */
export function RenderOverlay({
  message,
  height,
  gatheringId,
}: {
  message: string;
  height: string;
  gatheringId: number;
}) {
  const baseStyle = `absolute bg-black bg-opacity-80 z-10 top-0 left-0 flex items-center justify-center h-full w-full rounded-xl sm:rounded-3xl sm:h-${height}`;

  const buttonHandler = async () => {
    if (typeof window === 'undefined') return;

    if (!gatheringId || gatheringId === 0) {
      // 모임 찾기 페이지에서는 작동 X
      return;
    }
    try {
      await leaveJoinedGatherings(gatheringId);
      window.location.href = '/mypage'; // 사용되는 곳이 mypage밖에 없어서 mypage로 reDirection
    } catch (err) {
      console.error('모임 삭제 중 오류 발생:', err);
    }
  };

  return (
    <div className={baseStyle}>
      <div className="absolute top-1/2 flex h-9 w-28 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:right-5 sm:top-5 sm:size-12 sm:rounded-full">
        <button type="button" className="flex items-center gap-1" onClick={buttonHandler}>
          <Image src="icons/handIcon.svg" alt="손 아이콘" width={24} height={24} unoptimized />
          <p className="pt-[5px] text-xs font-semibold sm:hidden">모임 보내주기</p>
        </button>
      </div>
      <div className="absolute top-1/4 flex flex-col items-center text-xs text-white sm:top-1/3">
        <p>{`${message}된 챌린지에요,`}</p>
        <p>다음 기회에 만나요🙏</p>
      </div>
    </div>
  );
}
