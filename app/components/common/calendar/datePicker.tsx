'use client';

import {RefObject, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import {colStartClasses} from '../../../constants/calendar';
import {TimeInfo} from '../../../types/common/time.types';
import {ValueOf} from '../../../types/utils/util.types';
import {
  dateComparison,
  formatDate,
  getCalendarDays,
  getDayIndex,
  getFirstDayOfMonth,
  getNextMonth,
  getPreviousMonth,
  getTodayStart,
} from '../../../utils/date';

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: (time: ValueOf<TimeInfo>) => void;
  datePickerRef: RefObject<HTMLDivElement>;
};

export function DatePicker({selectedDate, setSelectedDate, datePickerRef}: CalendarProps) {
  const today = getTodayStart();
  const [currentMonth, setCurrentMonth] = useState(formatDate(selectedDate ?? today, 'MMM-yyyy'));
  const firstDayCurrentMonth = getFirstDayOfMonth(currentMonth, 'MMM-yyyy', selectedDate || today);

  const {days} = getCalendarDays(firstDayCurrentMonth);

  const previousMonth = () => {
    const {formattedMonth} = getPreviousMonth(firstDayCurrentMonth);
    setCurrentMonth(formattedMonth);
  };

  const nextMonth = () => {
    const {formattedMonth} = getNextMonth(firstDayCurrentMonth);
    setCurrentMonth(formattedMonth);
  };

  const handleSelectDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dateElement = event.currentTarget.closest('li');

    if (!dateElement || !dateElement.dataset.index) return;

    const dateIndex = parseInt(dateElement.dataset.index, 10);
    const newSelectedDate = days[dateIndex];
    setSelectedDate(newSelectedDate);
  };

  const getStyleOfDay = (day: Date) => {
    if (selectedDate && dateComparison.isEqual(day, selectedDate)) {
      return 'bg-orange-600 text-white';
    }

    if (dateComparison.isToday(day)) {
      return 'text-orange-600';
    }

    if (!dateComparison.isSameMonth(day, firstDayCurrentMonth)) return 'text-gray-400';

    return 'text-gray-800';
  };

  return (
    <div ref={datePickerRef} className="bg-white p-[10px] pb-4">
      <div className="flex items-center py-[5px]">
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <Image
            src="/icons/Calendar-l-arrow.svg"
            alt="이전 달로 이동"
            width={24}
            height={24}
            // className="size-5"
            aria-hidden="true"
          />
        </button>
        <h2 className="flex-auto text-center text-sm font-medium text-gray-800">
          {formatDate(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <Image
            src="/icons/Calendar-r-arrow.svg"
            alt="다음 달로 이동"
            width={24}
            height={24}
            // className="size-5"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="grid h-8 grid-cols-7 items-center text-center text-sm font-semibold leading-6 text-gray-800">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      {/* 날짜 표시 구간 */}
      <ul className="grid grid-cols-7 text-sm font-medium text-gray-800">
        {days.map((day, dayIdx) => {
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={clsx(`${dayIdx === 0 && colStartClasses[getDayIndex(day)]}`, {})}
            >
              <button
                type="button"
                onClick={handleSelectDate}
                className={clsx('h-8 w-full rounded-lg transition-colors', getStyleOfDay(day))}
              >
                <time dateTime={formatDate(day, 'yyyy-MM-dd')}>{formatDate(day, 'd')}</time>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
