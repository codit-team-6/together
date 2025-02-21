'use client';

import {toast} from 'react-toastify';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {leaveJoinedGatherings} from '../../apis/gatheringApi';

export function RenderOverlay({
  message,
  height,
  gatheringId,
  userId,
}: {
  message: string;
  height: string;
  gatheringId: number;
  userId: number;
}) {
  const route = useRouter();
  const baseStyle = `absolute bg-black bg-opacity-80 z-10 top-0 left-0 flex items-center justify-center h-full w-full rounded-xl sm:rounded-3xl sm:h-${height}`;

  const leaveGatheringButton = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!gatheringId || gatheringId === 0 || !userId) {
      // 모임 찾기 페이지에서는 작동 X
      return;
    }
    try {
      await leaveJoinedGatherings(gatheringId, userId);
      toast.success('모임에서 성공적으로 탈퇴했습니다.');

      route.refresh();
    } catch (error) {
      toast.error('모임 탈퇴 실패! 다시 시도해 주세요');
      throw new Error(error instanceof Error ? error.message : '모임 탈퇴 중 에러 발생');
    }
  };

  const detailButton = () => route.push(`/gatherings/${gatheringId}`);

  return (
    <div
      onClick={detailButton}
      onKeyPress={e => {
        if (e.key === 'Enter') detailButton();
      }}
      className={baseStyle}
      role="button"
      tabIndex={0}
    >
      <div className="absolute top-1/2 flex h-9 w-28 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:right-5 sm:top-5 sm:size-12 sm:rounded-full">
        <button type="button" className="flex items-center gap-1" onClick={leaveGatheringButton}>
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
