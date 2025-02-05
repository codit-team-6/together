import {GetJoinedGatherings} from '../../../types/gatherings/joinedGatherings.types';
import {MyPageCard} from '../myPageCard';

export function GatheringList({
  gatherings,
  isMyGathering,
}: {
  gatherings: GetJoinedGatherings[];
  isMyGathering: boolean;
}) {
  return gatherings.map(gathering => (
    <MyPageCard key={gathering.id} {...gathering} isMyGathering={isMyGathering} />
  ));
}
