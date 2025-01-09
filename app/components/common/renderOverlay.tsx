import Image from 'next/image';

import leaveGatheringsApi from '@/app/apis/leaveGatheringsApi';

/** 모임 취소, 마감 오버레이 */
export default function RenderOverlay(message: string, height: string, gatheringId: number) {
  const baseStyle =
    'absolute bg-black bg-opacity-80 z-10 top-0 left-0 flex items-center justify-center sm:h-full w-full rounded-xl sm:rounded-3xl';

  const buttonHandler = async () => {
    if (!gatheringId || gatheringId === 0) {
      // 모임 찾기 페이지에서는 작동 X
      return;
    }
    try {
      await leaveGatheringsApi(gatheringId);
      window.location.href = '/mypage'; // 지금 사용되는 곳이 mypage밖에 없어서 mypage로 reDirection
    } catch (err) {
      console.error('모임 삭제 중 오류 발생:', err);
    }
  };

  return (
    <div className={`${baseStyle} h-${height}`}>
      <div className="absolute sm:top-5 sm:right-5 top-1/2 sm:w-12 sm:h-12 w-28 h-9 bg-orange-50 sm:rounded-full rounded-xl text-orange-600 flex items-center justify-center">
        <button type="button" className="flex items-center gap-1" onClick={buttonHandler}>
          <Image src="/handIcon.svg" className="w-6 h-6" alt="손 아이콘" />
          <p className="font-semibold sm:hidden text-xs pt-[5px]">모임 보내주기</p>
        </button>
      </div>
      <div className="absolute text-white text-xs top-1/3 flex flex-col items-center">
        <p>{`${message}된 챌린지에요,`}</p>
        <p>다음 기회에 만나요🙏</p>
      </div>
    </div>
  );
}
