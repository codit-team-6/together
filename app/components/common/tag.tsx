import Image from 'next/image';

import {formatISODate} from '../../utils/date';

export function CloseTag({registrationEnd}: {registrationEnd: string}) {
  const {year, date, time} = formatISODate(registrationEnd);

  const getToday = new Date();
  const today = `${getToday.getFullYear()}년 ${getToday.getMonth() + 1}월 ${getToday.getDate()}일`;

  const registrationDate = `${year}년 ${date}`;

  if (registrationDate !== today) {
    return null;
  }

  const closeTime = time.split(':')[0];
  return (
    <div className="absolute right-0 top-0 flex h-[32px] w-[117px] items-center justify-center rounded-bl-xl bg-orange-600 pr-1 text-white">
      <Image src="icons/clockIcon.svg" alt="시계 아이콘" width={24} height={24} unoptimized />
      <p className="text-xs font-medium">오늘 {closeTime}시 마감</p>
    </div>
  );
}
