import Image from 'next/image';

import {GatheringParticipant} from '../../../types/gatherings/GatheringParticipant.types';

export function ParticipantIcons({participants}: {participants: GatheringParticipant[]}) {
  return (
    <div className="relative ml-[10px] flex">
      {participants.slice(0, 4).map((participant, index) => (
        <div
          key={participant.User.id}
          className="relative size-[29px] overflow-hidden rounded-full"
          style={{marginLeft: index !== 0 ? '-10px' : '0px', zIndex: 2 + index}}
        >
          <Image
            src={participant.User.image || '/icons/defaultProfileIcon.svg'}
            alt="사용자 아이콘"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
      {participants.length > 4 && (
        <div className="z-30 ml-[-10px] flex size-[29px] items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800">
          +{participants.length - 4}
        </div>
      )}
    </div>
  );
}
