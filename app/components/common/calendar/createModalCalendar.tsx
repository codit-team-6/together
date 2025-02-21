'use client';

import {useEffect, useLayoutEffect, useRef, useState} from 'react';

import clsx from 'clsx';

import {HOURS, MINUTES, PERIOD} from '../../../constants/calendar';
import {useClickOutside} from '../../../hooks/useClickOutSide';
import {TimeInfo} from '../../../types/common/time.types';
import {ValueOf} from '../../../types/utils/util.types';

import {DatePicker} from './datePicker';
import {TimePicker} from './timePicker';

export type TimeType = 'hour' | 'minute' | 'period';

export type TimeSelectorType = {
  type: TimeType;
  dataList: readonly string[];
  selectedTime: ValueOf<TimeInfo>;
  setSelectedTime: (time: ValueOf<TimeInfo>) => void;
};

type CreateModalCalendarProps = {
  onClose: () => void;
  timeInfo: TimeInfo;
  onChangeTimeInfo: (field: keyof TimeInfo, newValue: ValueOf<TimeInfo>) => void;
};

// Todo: 모달 형식의 ui가 제위치에 표시도리 수 있도록 해주는 기능 hook으로 정리 필요 (드롭다운, 캘린더 컴포넌트 참고해서 작성)
// Todo: 내부에서 useLayoutEffect를 이용해서 넓이 계산 및 어떤 방향에 따라 적용햘지 고려해서 리팩토링해보기
export function CreateModalCalendar({
  onClose,
  timeInfo,
  onChangeTimeInfo,
}: CreateModalCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null); // 캘린더의 높이를 위한 ref
  const [datePickerHeight, setDatePickerHeight] = useState<string>('0px');
  const [datePickerLocation, setDatePickerLocation] = useState<'up' | 'down'>('down');

  // 외부 클릭에 대한 모달 닫기 처리
  useClickOutside(calendarRef, onClose, {eventTypes: ['mousedown']});

  // 초기 높이 랜더링시 0으로 처리되는 문제 해결을 위한 useLayoutEffect 처리
  useLayoutEffect(() => {
    if (!datePickerRef.current) return;

    const initialHeight = datePickerRef.current.offsetHeight;
    if (initialHeight) {
      setDatePickerHeight(`${initialHeight}px`);
    }

    const calendarBottom = datePickerRef.current.getBoundingClientRect().bottom;
    const viewPortBottom = window.innerHeight;
    setDatePickerLocation(viewPortBottom - calendarBottom > 0 ? 'down' : 'up');
  }, []);

  // 달마다 주차수가 달라서, 달 변경시 달라지는 datePicker의 높이를 반영하기 위한 resizeObserver
  useEffect(() => {
    if (!datePickerRef.current) return undefined;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        setDatePickerHeight(`${element.offsetHeight}px`);
      });
    });

    resizeObserver.observe(datePickerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const timeInfoList: TimeSelectorType[] = [
    {
      type: 'hour',
      dataList: HOURS,
      selectedTime: timeInfo.selectedHour,
      setSelectedTime: hour => onChangeTimeInfo('selectedHour', hour),
    },
    {
      type: 'minute',
      dataList: MINUTES,
      selectedTime: timeInfo.selectedMinute,
      setSelectedTime: minute => onChangeTimeInfo('selectedMinute', minute),
    },
    {
      type: 'period',
      dataList: PERIOD,
      selectedTime: timeInfo.selectedPeriod,
      setSelectedTime: period => onChangeTimeInfo('selectedPeriod', period),
    },
  ];

  return (
    <div
      ref={calendarRef}
      style={{
        height: datePickerHeight,
      }}
      className={clsx(
        'absolute mx-auto box-content inline-flex flex-row overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-[7px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.04)]',
        [datePickerLocation === 'down' ? 'top-[calc(100%+7px)]' : 'bottom-[calc(100%+7px)]'],
      )}
    >
      <div className="mr-[10px] w-[270px]">
        <DatePicker
          selectedDate={timeInfo.selectedDate}
          setSelectedDate={date => onChangeTimeInfo('selectedDate', date)}
          datePickerRef={datePickerRef}
        />
      </div>
      {timeInfoList.map(timeInfItem => (
        <div className="ml-[10px] border-l border-gray-200" key={timeInfItem.type}>
          <TimePicker
            dataList={timeInfItem.dataList}
            selectedTime={timeInfItem.selectedTime}
            setSelectedTime={timeInfItem.setSelectedTime}
          />
        </div>
      ))}
    </div>
  );
}
