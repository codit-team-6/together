import {useRouter} from 'next/navigation';

import {leaveJoinedGatherings} from '../../apis/gatherings/gatheringApi';

export function ActionButton({
  isCompleted,
  isReviewed,
  gatheringId,
  onOpenModal,
  userId,
}: {
  isCompleted: boolean;
  isReviewed: boolean;
  gatheringId: number;
  onOpenModal: () => void;
  userId: number;
}) {
  const baseStyle = 'w-[120px] h-[40px] rounded-xl font-semibold text-sm';
  const router = useRouter();
  if (isCompleted && isReviewed) {
    return null;
  }

  const label = isCompleted ? '리뷰 작성하기' : '예약 취소하기';
  const handleButton = async () => {
    try {
      if (isCompleted) {
        onOpenModal();
      } else {
        await leaveJoinedGatherings(gatheringId, userId);
        router.push('/mypage');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '모임 참여 취소 중 에러 발생');
    }
  };
  const style = isCompleted
    ? 'bg-orange-600 text-white'
    : 'bg-white text-orange-600 border-2 border-orange-500';

  return (
    <button type="button" className={`${baseStyle} ${style}`} onClick={handleButton}>
      {label}
    </button>
  );
}
