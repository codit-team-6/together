'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {deleteLeaveGathering, postJoinGathering, putCancelGathering} from '../../apis/gatheringApi';
import {gatheringsQueryKey} from '../../queries/common/queryKeys';

export type ModalType = {
  type: 'confirm' | 'alert' | 'redirect';
  message: string;
};
export type ModalPropsType = {
  isLogin: boolean;
  isOwner: boolean;
  isParticipated: boolean;
  gatheringId: number | undefined;
  modalType: ModalType;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsParticipated: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  isLogin,
  isOwner,
  isParticipated,
  gatheringId,
  modalType,
  setIsModalOpen,
  setIsParticipated,
}: ModalPropsType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const postJoinGatheringMutation = useMutation({
    mutationFn: (id: number) => postJoinGathering(id),
    onSuccess: () => {
      console.log('🥳모임 참여 성공했음!!!!');
      queryClient.invalidateQueries({
        queryKey: gatheringsQueryKey.GatheringDetails(gatheringId!),
      });
      setIsLoading(false);
      setIsParticipated(true);
    },
  });

  const deleteLeaveGatheringMutation = useMutation({
    mutationFn: (id: number) => deleteLeaveGathering(id),
    onSuccess: () => {
      console.log('모임을 떠났습니다🏃‍➡️🏃‍♀️‍➡️🏃‍♂️‍➡️ 모임떠나기 성공');
      queryClient.invalidateQueries({
        queryKey: gatheringsQueryKey.GatheringDetails(gatheringId!),
      });
      queryClient.invalidateQueries({queryKey: gatheringsQueryKey.joinedGatherings()});
      setIsLoading(false);
      setIsParticipated(false);
    },
  });

  const putCancelGatheringMutation = useMutation({
    mutationFn: (id: number) => putCancelGathering(id),
    onSuccess: data => {
      console.log(data.message);
      queryClient.invalidateQueries({
        queryKey: gatheringsQueryKey.GatheringDetails(gatheringId!),
      });
      setIsLoading(false);
      setIsParticipated(false);
    },
  });

  const handleCloseButton = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleRedirectButton = () => {
    setIsLoading(true);
  };

  const handleConfirmButton = () => {
    setIsModalOpen(prev => !prev);
    if (!isOwner && isLogin && !isParticipated) {
      if (gatheringId) {
        postJoinGatheringMutation.mutate(gatheringId);
        setIsLoading(true);
      }
      return;
    }
    if (!isOwner && isLogin && isParticipated) {
      if (gatheringId) {
        deleteLeaveGatheringMutation.mutate(gatheringId);
      }
      // 모임 참여 취소하면 메인페이지로 감
      return;
    }
    if (isOwner) {
      if (gatheringId) {
        putCancelGatheringMutation.mutate(gatheringId);
        router.replace('/');
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 z-30 flex size-full items-center justify-center bg-gray-500/50 p-0">
      <div className="z-50 flex h-[199px] w-[300px] flex-col items-center justify-between rounded-lg bg-white p-6 sm:h-[188px] sm:w-[450px]">
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <span className="text-2xl font-semibold text-orange-600">로딩 중...</span>
          </div>
        ) : (
          <>
            <div
              className={`flex w-full justify-end ${modalType.type !== 'redirect' ? 'invisible' : 'block'}`}
            >
              <Image
                src="/icons/close-button.svg"
                alt="닫기 버튼"
                width={24}
                height={24}
                onClick={handleCloseButton}
                className="cursor-pointer"
              />
            </div>
            <div>
              <span className="text-gray-900">{modalType.message}</span>
            </div>
            {modalType.type === 'redirect' ? (
              <Link
                href="/login"
                className="flex w-full justify-center sm:justify-end"
                onClick={handleRedirectButton}
              >
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                >
                  확인
                </button>
              </Link>
            ) : (
              ''
            )}
            {modalType.type === 'alert' ? (
              <div className="flex w-full justify-center sm:justify-end">
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                  onClick={handleCloseButton}
                >
                  확인
                </button>
              </div>
            ) : (
              ''
            )}

            {modalType.type === 'confirm' ? (
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl border border-orange-600 font-semibold text-orange-600"
                  onClick={handleCloseButton}
                >
                  아니요
                </button>
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                  onClick={handleConfirmButton}
                >
                  네
                </button>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  );
}
