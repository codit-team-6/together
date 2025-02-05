import {Gathering, Locations} from '../common/gatheringFilter.types';

export type CreateGathering = {
  location: Locations;
  type: Gathering;
  name: string;
  dateTime: string;
  capacity: number;
  image: string;
  registrationEnd: string;
};
