export type CalendarDays = {
  startDay: Date;
  endDay: Date;
  days: Date[];
};

export type MonthNavigationResult = {
  firstDayNextMonth: Date;
  formattedMonth: string;
};

export type CalendarType = 'startDatePicker' | 'endDatePicker';
