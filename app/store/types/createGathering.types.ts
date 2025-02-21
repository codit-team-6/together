import {GatheringFormSchema} from '../../utils/validation';

export type GatheringFormDateState = {gatheringFormData: GatheringFormSchema | null};
type GatheringFormDateActions = {
  setGatheringFormData: (data: GatheringFormSchema) => void;
  resetGatheringFormData: () => void;
};
export type GatheringFormDataStore = GatheringFormDateState & GatheringFormDateActions;
