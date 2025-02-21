'use client';

import {Dispatch, SetStateAction, useEffect} from 'react';

import {GetReviewsProps} from '../../../types/reviews/reviewsApi.types';

import {Calendar} from './calendar';

export type CalendarWrapperType = {
  updateQueryString: (newFilter: Partial<GetReviewsProps>) => void;
  filter: GetReviewsProps;
  setFilter: Dispatch<SetStateAction<GetReviewsProps>>;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setFormattedDate: Dispatch<SetStateAction<string>>;
  setIsCalendarOpen: Dispatch<SetStateAction<boolean>>;
  setIsReset: Dispatch<SetStateAction<boolean>>;
  formattedDate: string;
};

function CalendarWrapper({
  updateQueryString,
  filter,
  setFilter,
  selectedDate,
  setSelectedDate,
  setFormattedDate,
  setIsCalendarOpen,
  setIsReset,
  formattedDate,
}: CalendarWrapperType) {
  const formatSelectedDate = () => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const date = String(selectedDate.getDate()).padStart(2, '0');

      const formattedDateString = `${year}-${month}-${date}`;
      setFormattedDate(formattedDateString);
    } else {
      setFormattedDate('');
    }
  };

  const handleClickApplyButton = () => {
    setIsCalendarOpen(false);
    if (formattedDate !== '') {
      formatSelectedDate();
    }
    setFilter({...filter, date: formattedDate});
    updateQueryString({...filter, date: formattedDate});
  };
  const handleClickResetButton = () => {
    setFormattedDate('');
    setIsReset(true);
  };

  useEffect(() => {
    formatSelectedDate();
  }, [selectedDate]);

  return (
    <div className="absolute top-1 z-50 mx-auto flex max-w-[336px] flex-col rounded-xl border border-gray-200 bg-white px-11 py-6 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.04)]">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="mt-3 flex gap-3">
        <button
          className="h-10 w-[118px] rounded-xl border border-orange-600 text-orange-600"
          type="button"
          onClick={handleClickResetButton}
        >
          초기화
        </button>
        <button
          className="h-10 w-[118px] rounded-xl bg-orange-600 text-white"
          type="button"
          onClick={handleClickApplyButton}
        >
          적용
        </button>
      </div>
    </div>
  );
}

export default CalendarWrapper;
