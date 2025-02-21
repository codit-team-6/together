import {useEffect, useRef, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import {SelectItem} from '../../../../types/gatherings/createGathering.types';

interface CustomLocationSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: SelectItem[];
  // eslint-disable-next-line react/require-default-props
}

export function LocationSelect({value, onChange, options}: CustomLocationSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectItem) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1 block text-base font-medium">장소</label>

      {/* Hidden native select for accessibility */}
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="sr-only"
        aria-hidden="true"
      >
        <option value="">장소를 선택해주세요</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom select button */}
      <button
        type="button"
        className={clsx(
          'flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-[10px] text-left text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-black' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : '장소를 선택해주세요'}
        </span>
        <Image
          src="/icons/dropdownArrow.svg"
          alt="드롭 다운 아이콘"
          width={24}
          height={24}
          className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-lg">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              className={`flex w-full items-center px-4 py-2 text-left hover:bg-gray-50 ${option.value === value ? 'bg-gray-100' : ''} `}
              onClick={() => handleSelect(option)}
            >
              <p className={`rounded-full px-3 py-1 ${option.value === value && 'font-medium'} `}>
                {option.label}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
