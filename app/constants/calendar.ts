/**
 * 요일에 따른 시작 위치 클래스
 */
export const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export const HOURS = [
  '12',
  ...Array.from({length: 11}, (_, i) => String(i + 1).padStart(2, '0')),
] as const;
export const MINUTES = [...Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'))] as const;
export const PERIOD = ['AM', 'PM'] as const;
