import {useState} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {writeReview} from '../../apis/reviews/reviewApi';
import {InputTextBox} from '../common/inputText';

export function WriteReviewModal({
  onClose,
  gatheringId,
}: {
  onClose: () => void;
  gatheringId: number;
}) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const route = useRouter();

  const handleSubmit = async () => {
    try {
      if (!comment.trim()) {
        alert('리뷰를 입력해주세요!');
        return;
      }
      if (rating <= 0) {
        alert('별점을 선택해주세요!');
        return;
      }

      await writeReview(gatheringId, rating, comment);
      alert('리뷰가 등록되었습니다.');
      route.push('/mypage');
      onClose();
    } catch (error) {
      alert('리뷰 등록에 실패했습니다.');
    }
  };
  return (
    <div className="absolute z-50 flex size-full items-center justify-center">
      <div className="flex h-[408px] w-[343px] items-center justify-center rounded-md bg-white sm:w-[520px]">
        <div className="flex h-[360px] w-[295px] flex-col gap-[24px] sm:w-[472px]">
          <p className="h-[28px] w-full text-lg font-semibold">리뷰 쓰기</p>
          <div className="flex h-[60px] w-full flex-col">
            <p className="font-semibold">만족스러운 경험이었나요?</p>
            <div className="mt-[12px] flex">
              {[1, 2, 3, 4, 5].map(heart => (
                <button
                  key={heart}
                  type="button"
                  onClick={() => setRating(heart)}
                  style={{cursor: 'pointer', background: 'none', border: 'none', padding: 0}}
                  aria-label={`Rate ${heart} hearts`}
                >
                  <Image
                    src={heart <= rating ? 'icons/heart-active.svg' : 'icons/heart-default.svg'}
                    alt="하트"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="h-[156px] w-full">
            <p>경험에 대해 남겨주세요</p>
            <InputTextBox
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원분들께 큰 도움이 됩니다."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              height={120}
            />
          </div>
          <div className="flex h-[44px] w-full gap-[16px]">
            <button
              type="button"
              className="flex h-full w-[228px] items-center justify-center rounded-md border-2 border-orange-600 font-semibold text-orange-600"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className={`flex h-full w-[228px] items-center justify-center rounded-md ${
                rating > 0 && comment.trim() !== '' ? 'bg-orange-600' : 'bg-gray-400'
              } font-semibold text-white`}
              onClick={handleSubmit}
            >
              리뷰 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
