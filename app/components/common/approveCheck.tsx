import Image from 'next/image';

import {MIN_PARTICIPANT_COUNT} from '../../constants/commonConstants';

/** 5인 이상 개설 확정 */
export function ApproveCheck(participantCount: number): React.ReactNode {
  if (participantCount >= MIN_PARTICIPANT_COUNT) {
    return (
      <div className="ml-3 flex items-center font-medium text-orange-500">
        <Image
          src="icons/orangeCheckIcon.svg"
          alt="확정 아이콘"
          width={24}
          height={24}
          unoptimized
        />
        <p className="mt-1">개설확정</p>
      </div>
    );
  }
  return null;
}
