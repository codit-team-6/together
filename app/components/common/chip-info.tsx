import {formatISODate} from '../../utils/date';

export function DateTimeInfoChip({dateTime}: {dateTime: string}) {
  const {date, time} = formatISODate(dateTime);

  return (
    <div className="flex space-x-2">
      <div className="flex h-[24px] w-[58px] items-center justify-center rounded-md bg-gray-900 text-xs font-medium text-white">
        <p>{date}</p>
      </div>
      <div className="flex h-[24px] w-[51px] items-center justify-center rounded-md bg-gray-900 text-xs font-medium text-orange-600">
        <p>{time}</p>
      </div>
    </div>
  );
}
