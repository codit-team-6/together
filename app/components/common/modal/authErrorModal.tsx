import {useState} from 'react';
import {createPortal} from 'react-dom';

import Image from 'next/image';
import Link from 'next/link';

import {useClearAuth} from '../../../hooks/useAuth';

export type ModalPropsType = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// todo: gatherings/modal.tsx와 병합 과정 필요
export default function AuthErrorModal({setIsModalOpen}: ModalPropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const {clearAuth} = useClearAuth();

  const handleCloseButton = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleRedirectButton = async () => {
    await clearAuth();
    setIsLoading(true);
  };

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-gray-500/50 p-0">
      <div className="flex h-[199px] w-[300px] flex-col items-center justify-between rounded-lg bg-white p-6 sm:h-[188px] sm:w-[450px]">
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <span className="text-2xl font-semibold text-orange-600">로딩 중...</span>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-end">
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
              <span className="text-gray-900">로그인이 필요해요</span>
            </div>

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
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
