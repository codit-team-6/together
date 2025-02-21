import {useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import {TimeInfo} from '../../../../types/common/time.types';
import {DateTimePickerProps} from '../../../../types/gatherings/createGathering.types';
import {ValueOf} from '../../../../types/utils/util.types';
import {formatDateTimeForAPI, getTimeInfoUI} from '../../../../utils/date';
import {CreateModalCalendar} from '../../../common/calendar/createModalCalendar';

// Todo: useEffect를 이용해 storage에서 정보가 있다면 받아오기
export function GatheringDateTimePicker({label, value: timeInfo, onChange}: DateTimePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleTimeInfoChange = (field: keyof TimeInfo, newValue: ValueOf<TimeInfo>) => {
    const newTimeInfo: TimeInfo = {...timeInfo, [field]: newValue};
    onChange(newTimeInfo);
    setIsChanged(true);
  };

  return (
    <>
      <label className="mb-1 block text-base font-medium">{label}</label>
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className={clsx(
          'flex w-full items-center justify-between rounded-lg bg-gray-50 p-3',
          'text-left text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-600',
          showCalendar && 'ring-2 ring-orange-600',
          !isChanged && 'text-gray-400',
        )}
      >
        {/* 시간이 바뀔 때 일어나는 layout shift 방지를 위해 직접 width 지정(0000-00-00 00:00 PM 일때 width 기준) */}
        <span className="w-[172px]">{getTimeInfoUI(timeInfo)}</span>
        <Image
          src="icons/calendar.svg"
          alt="달력 아이콘"
          width={18}
          height={20}
          className="ml-[10px]"
        />
      </button>

      {/* formData 처리용 input */}
      <input
        type="datetime-local"
        value={formatDateTimeForAPI(timeInfo)}
        className="hidden"
        readOnly
      />

      {showCalendar && (
        <CreateModalCalendar
          onClose={() => setShowCalendar(false)}
          timeInfo={timeInfo}
          onChangeTimeInfo={handleTimeInfoChange}
        />
      )}
    </>
  );
}
