import {Dispatch, SetStateAction} from 'react';

export type Gathering = 'DALLAEMFIT' | 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type GatheringFilterProps = {
  gatheringType: Gathering;
  setGatheringType: Dispatch<SetStateAction<Gathering>>;
};

export type ReviewedGatheringFilter = 'myGatherings' | 'myReviews' | 'createdGatherings';

export type Locations = '건대입구' | '을지로3가' | '신림' | '홍대입구';

export type SortBy = 'dateTime' | 'registrationEnd' | 'participantsCount';
