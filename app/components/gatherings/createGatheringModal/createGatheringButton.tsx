'use client';

import {useState} from 'react';

import {useUserQuery} from '../../../queries/user/useUserQuries';
import {useGatheringFormDataStore} from '../../../store/gathering/useCreateGathering';

import {CreateGatheringModal} from './createGatheringModal';

export function CreateGatheringButton() {
  const {data: userInfo} = useUserQuery().getMyInfo();

  const [isOpen, setIsOpen] = useState(false);
  const resetGatheringFormData = useGatheringFormDataStore(state => state.resetGatheringFormData);

  return (
    <>
      {userInfo && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute right-0 top-0 rounded-xl bg-orange-600 px-5 py-[10px] text-base font-semibold text-white transition-colors hover:bg-orange-600/90"
        >
          모임 만들기
        </button>
      )}
      {isOpen && (
        <CreateGatheringModal
          onClose={() => {
            setIsOpen(false);
            resetGatheringFormData();
          }}
        />
      )}
    </>
  );
}
