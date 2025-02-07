import {User} from '../users/getUserInfo.types';

export type GatheringParticipant = {
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: User;
};
