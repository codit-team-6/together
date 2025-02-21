// timePicker.tsx

'use client';

import clsx from 'clsx';

import {TimeInfo} from '../../../types/common/time.types';
import {ValueOf} from '../../../types/utils/util.types';

type TimePickerProps = {
  dataList: readonly string[];
  selectedTime: ValueOf<TimeInfo>;
  setSelectedTime: (time: ValueOf<TimeInfo>) => void;
};

export function TimePicker({dataList, selectedTime, setSelectedTime}: TimePickerProps) {
  const handleSelectTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedElement = event.currentTarget;
    const clickedTime = clickedElement.dataset.time;

    if (!clickedElement || !clickedTime) return;

    setSelectedTime(clickedTime);
  };
  return (
    <div className="scrollbar-thin flex h-full flex-col gap-[10px] overflow-x-hidden p-[10px]">
      {dataList.map(time => {
        return (
          <button
            type="button"
            data-time={time}
            key={time}
            onClick={handleSelectTime}
            className={clsx(
              'min-h-8 min-w-10 rounded-lg text-base transition-colors',
              selectedTime === time
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
