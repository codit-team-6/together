'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import clsx from 'clsx';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import Image from 'next/image';

// 요일별 클래스 관리
const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

export function Calendar({selectedDate, setSelectedDate}: CalendarProps) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(selectedDate ?? today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', selectedDate || today);

  const startDay = startOfWeek(startOfMonth(firstDayCurrentMonth));
  const endDay = endOfWeek(endOfMonth(firstDayCurrentMonth));
  const days = eachDayOfInterval({
    start: startDay,
    end: endDay,
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const handleSelectDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dateElement = event.currentTarget.closest('li');

    if (!dateElement || !dateElement.dataset.index) return;

    const dateIndex = parseInt(dateElement.dataset.index, 10);
    const newSelectedDate = days[dateIndex];
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center">
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
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
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
      <ul className="grid grid-cols-7 text-sm font-medium text-gray-800">
        {days.map((day, dayIdx) => {
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={`${dayIdx === 0 && colStartClasses[getDay(day)]}`}
            >
              <button
                type="button"
                onClick={handleSelectDate}
                className={clsx(
                  'h-8 w-full rounded-lg transition-colors',
                  [!isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400'],
                  isEqual(day, selectedDate)
                    ? 'bg-orange-600 text-white'
                    : isToday(day) && 'text-orange-600',
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
