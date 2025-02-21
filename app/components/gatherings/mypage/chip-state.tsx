import Image from 'next/image';

export function UpcomingReservationChip() {
  return (
    <div className="flex h-[32px] w-[76px] items-center justify-center rounded-[24px] bg-orange-100 text-[14px] font-medium leading-none text-orange-600">
      <p>이용 예정</p>
    </div>
  );
}

export function ReservationFinishedChip() {
  return (
    <div className="flex h-[32px] w-[76px] items-center justify-center rounded-[24px] bg-gray-200 text-[14px] font-medium leading-none text-gray-500">
      <p>이용 완료</p>
    </div>
  );
}

export function WaitingForApproval() {
  return (
    <div className="flex h-[32px] w-[76px] items-center justify-center rounded-[24px] border border-gray-200 bg-white text-[14px] font-medium leading-none text-gray-500">
      <p>개설대기</p>
    </div>
  );
}

export function EventApproved() {
  return (
    <div className="flex h-[32px] w-[93px] items-center justify-center rounded-[24px] border border-orange-100 bg-white text-[14px] font-medium leading-none text-orange-500">
      <Image src="icons/orangeCheckIcon.svg " alt="check icon" width={16} height={16} unoptimized />
      <p className="ml-1">개설확정</p>
    </div>
  );
}
