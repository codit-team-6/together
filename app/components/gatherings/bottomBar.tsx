/* eslint-disable no-nested-ternary */

'use client';

import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {usePathname, useRouter} from 'next/navigation';

import Modal, {ModalType} from './modal';

type BottomBarType = {
  isLogin: boolean;
  isOwner: boolean;
  isParticipated: boolean;
  setIsParticipated: Dispatch<SetStateAction<boolean>>;
  isFull: boolean;
  isCancel: string | null | undefined;
  isFinishedGathering: boolean;
  gatheringId: number | undefined;
};

export default function BottomBar({
  isLogin,
  isOwner,
  isParticipated,
  setIsParticipated,
  isFull,
  isCancel,
  isFinishedGathering,
  gatheringId,
}: BottomBarType) {
  const router = useRouter();
  const pathName = usePathname();
  const [shareUrl, setShareUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>({
    type: 'redirect',
    message: '',
  });

  const getCurrentUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL;
    const fullUrl = `${baseUrl}${pathName}`;
    setShareUrl(fullUrl);
  };

  useEffect(() => {
    if (gatheringId !== undefined) {
      setIsLoading(false);
    }
  }, [pathName, gatheringId]);

  useEffect(() => {
    getCurrentUrl();
  }, [shareUrl]);

  const handleJoinButton = () => {
    if (isLogin && !isOwner) {
      setIsModalOpen(true);
      setModalType({
        type: 'confirm',
        message: '참여하시겠어요?',
      });
    } else {
      setIsModalOpen(true);
      setModalType({
        type: 'redirect',
        message: '로그인이 필요해요',
      });
    }
  };

  const handleLeaveButton = () => {
    if (isLogin && !isOwner) {
      setIsModalOpen(true);
      setModalType({
        type: 'confirm',
        message: '참여를 취소하시겠어요?',
      });
    } else {
      setIsModalOpen(true);
      setModalType({
        type: 'redirect',
        message: '로그인이 필요해요',
      });
    }
  };

  const handleCancelButton = () => {
    if (isLogin && isOwner) {
      setIsModalOpen(true);
      setModalType({
        type: 'confirm',
        message: '정말 취소하시겠어요?',
      });
    } else {
      setModalType({
        type: 'alert',
        message: '모임 주최자가 아니에요😞',
      });
    }
  };

  const handleShareButton = async () => {
    if (isLogin && isOwner) {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          console.log('클립보드 복사 성공', shareUrl);
        } catch (error) {
          console.error('클립보드 복사 실패');
        }
      }
      setIsModalOpen(true);
      setModalType({
        type: 'alert',
        message: '링크가 복사됐어요!',
      });
    }
  };

  const handleFindAnotherGatheringButton = () => {
    router.replace('/gatherings');
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 z-10 w-full border-t-2 border-t-gray-900 bg-white px-4 py-5 sm:h-[84px] sm:justify-center sm:px-6 ${isOwner ? 'h-auto sm:flex' : 'flex h-auto justify-between'}`}
      >
        <div
          className={`md:w-[996px] ${
            isOwner && !isCancel
              ? 'grid grid-rows-2 gap-[10px] sm:flex sm:justify-between'
              : 'flex items-center justify-between gap-6'
          }`}
        >
          <div className="flex flex-col justify-between gap-1">
            <div
              className={`text-sm font-semibold ${isCancel || isFinishedGathering ? 'text-red-500' : 'text-gray-900'} sm:text-base`}
            >
              {isCancel
                ? '모집 취소된 모임이에요😞'
                : isFinishedGathering
                  ? '이미 지난 모임이에요🖐️'
                  : '더 건강한 나와 팀을 위한 프로그램🏃'}
            </div>
            <div className="text-xs text-gray-700">
              {isCancel
                ? '다음에 더 좋은 프로그램으로 찾아뵐게요! 🙏'
                : isFinishedGathering
                  ? '참여했던 분들은 후기를 남겨주시면 큰 도움이 돼요! ✏️'
                  : isOwner
                    ? '모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요'
                    : '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요'}
            </div>
          </div>
          <div className={`${isOwner ? 'flex gap-2 sm:w-[238px]' : 'flex justify-end'} `}>
            {isCancel ? (
              <button
                onClick={handleFindAnotherGatheringButton}
                type="button"
                className="h-11 w-[200px] rounded-xl bg-orange-600 font-semibold text-white"
              >
                🔍 다른 모임 찾아보기
              </button>
            ) : isOwner ? (
              <>
                <button
                  onClick={handleCancelButton}
                  type="button"
                  className="h-11 flex-1 rounded-xl border border-orange-600 font-semibold text-orange-600"
                >
                  취소하기
                </button>
                <button
                  onClick={handleShareButton}
                  type="button"
                  className="h-11 flex-1 rounded-xl bg-orange-600 font-semibold text-white"
                >
                  공유하기
                </button>
              </>
            ) : isParticipated ? (
              <button
                onClick={handleLeaveButton}
                type="button"
                className="font-semibol h-11 w-[115px] rounded-xl border border-orange-600 text-orange-600"
              >
                참여 취소하기
              </button>
            ) : (
              <button
                onClick={handleJoinButton}
                type="button"
                disabled={isLoading || isFull || isFinishedGathering}
                className={`h-11 w-[115px] rounded-xl font-semibold text-white ${
                  isLoading || isFull || isFinishedGathering
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-orange-600'
                }`}
              >
                {isFinishedGathering ? '지난 모임' : '참여하기'}
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <Modal
          isLogin={isLogin}
          isOwner={isOwner}
          isParticipated={isParticipated}
          gatheringId={gatheringId}
          modalType={modalType}
          setIsModalOpen={setIsModalOpen}
          setIsParticipated={setIsParticipated}
        />
      ) : (
        ''
      )}
    </>
  );
}
