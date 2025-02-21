import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

import {GatheringFormSchema} from '../../utils/validation';
import {GatheringFormDataStore, GatheringFormDateState} from '../types/createGathering.types';

const initialFormData: GatheringFormDateState = {gatheringFormData: null};

export const useGatheringFormDataStore = create<GatheringFormDataStore>()(
  devtools(
    persist(
      set => ({
        ...initialFormData,
        setGatheringFormData: (newData: GatheringFormSchema) =>
          set(() => ({gatheringFormData: newData})),
        resetGatheringFormData: () => set(() => initialFormData),
      }),
      {name: 'gathering-formdata', storage: createJSONStorage(() => sessionStorage)}, // storage에 저장될 고유 이름, storage 종류
    ),
  ),
);
