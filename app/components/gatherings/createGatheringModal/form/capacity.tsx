import clsx from 'clsx';

import {UnControlledInputProps} from '../../../../types/gatherings/createGathering.types';
import {GatheringFormSchema} from '../../../../utils/validation';

export function Capacity({
  register,
  registerKey,
  label,
}: UnControlledInputProps<GatheringFormSchema>) {
  return (
    <>
      <label className="mb-1 block text-base font-medium">{label}</label>
      <input
        {...register(registerKey, {valueAsNumber: true})}
        type="number"
        placeholder="최소 5인 이상 입력해주세요."
        pattern="[0-9]*" // 숫자만 허용
        step="1" // 정수만 허용
        inputMode="numeric" // 모바일에서 숫자 키패드 표시
        onKeyDown={e => {
          // e, ., +, - 등의 키 입력 방지
          if (e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-') {
            e.preventDefault();
          }
        }}
        className={clsx(
          'no-spinner w-full rounded-lg bg-gray-50 px-4 py-[10px] placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
      />
    </>
  );
}
