import clsx from 'clsx';

import {InputProps} from '../../../../types/gatherings/createGathering.types';

export function ImageUpload({value, onChange}: InputProps<File | null>) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile: File | undefined | null = event.target.files?.[0];
    if (!newFile) return;

    onChange(newFile);
  };

  return (
    <>
      <label className="mb-1 block text-base font-medium">이미지</label>
      <div className="flex w-full gap-3">
        <p
          className={clsx(
            'min-w-0 grow truncate rounded-lg',
            'bg-gray-50 px-4 py-[10px]',
            'focus:outline-none focus:ring-2 focus:ring-orange-600',
            [!value && 'text-gray-400'],
          )}
        >
          {value ? value.name : '이미지를 첨부해주세요'}
        </p>
        <label className="flex shrink-0">
          <p className="cursor-pointer justify-center self-center rounded-xl border border-orange-600 px-4 py-[10px] font-semibold text-orange-600">
            파일 찾기
          </p>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
    </>
  );
}
