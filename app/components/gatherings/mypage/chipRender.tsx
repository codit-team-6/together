import {
  EventApproved,
  ReservationFinishedChip,
  UpcomingReservationChip,
  WaitingForApproval,
} from './chip-state';

export function RenderChips({
  isCompleted,
  participantCount,
  isMyGathering,
}: {
  isCompleted: boolean;
  participantCount: number;
  isMyGathering: boolean | undefined;
}) {
  if (!isMyGathering) {
    return null;
  }

  return (
    <div className="flex h-[50px] w-full justify-start gap-[8px] pt-[8px]">
      {isCompleted ? (
        <ReservationFinishedChip />
      ) : (
        <>
          <UpcomingReservationChip />
          {participantCount >= 5 ? <EventApproved /> : <WaitingForApproval />}
        </>
      )}
    </div>
  );
}
