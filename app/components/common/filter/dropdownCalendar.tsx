import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {startOfToday} from 'date-fns';
import Image from 'next/image';

import {GetReviewsProps} from '../../../types/reviews/reviewsApi.types';
import CalendarWrapper from '../calendar/calendarWrapper';

export type DropdownCalendarType = {
  updateQueryString: (newFilter: Partial<GetReviewsProps>) => void;
  filter: GetReviewsProps;
  setFilter: Dispatch<SetStateAction<GetReviewsProps>>;
};

export default function DropdownCalendar({
  updateQueryString,
  filter,
  setFilter,
}: DropdownCalendarType) {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday()); // startOfToday === today's date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (!filter.date) {
      setDisplayDate('');
      setSelectedDate(startOfToday());
    } else {
      setFormattedDate(filter.date);
      setDisplayDate(filter.date.replaceAll('-', '/').slice(2));
    }
  }, [filter.date]);

  const handleClickToggleCalendarButton = () => {
    if (isReset) {
      setSelectedDate(startOfToday()); // 초기화 후 다시 버튼을 누르면 오늘 날짜로 설정
      setIsReset(false); // 다시 초기화 상태 해제
    }
    setIsCalendarOpen(true);
  };

  const updateDisplayDate = () => {
    if (formattedDate !== '') {
      const buttonString = formattedDate.replaceAll('-', '/').slice(2);
      setDisplayDate(buttonString);
    } else {
      setDisplayDate('');
    }
  };

  useEffect(() => {
    updateDisplayDate();
  }, [formattedDate]);

  return (
    <div>
      <div>
        <button
          onClick={handleClickToggleCalendarButton}
          type="button"
          className={`xs:h-10 xs:py-1 flex h-9 w-[116px] items-center justify-between rounded-xl border-2 ${displayDate ? `bg-gray-900 text-gray-50` : ''} border-gray-100 px-[10px] py-[6px]`}
        >
          <span className="text-sm">{displayDate || '날짜 전체'}</span>

          <Image
            alt="아래방향 화살표"
            width={24}
            height={24}
            src={`${displayDate ? '/icons/arrow-inverse-down.svg' : '/icons/arrow-default-down.svg'}`}
          />
        </button>
      </div>
      <div className="relative">
        {isCalendarOpen && (
          <CalendarWrapper
            updateQueryString={updateQueryString}
            filter={filter}
            setFilter={setFilter}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setFormattedDate={setFormattedDate}
            setIsCalendarOpen={setIsCalendarOpen}
            setIsReset={setIsReset}
            formattedDate={formattedDate}
          />
        )}
      </div>
    </div>
  );
}
