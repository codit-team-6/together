import {InputProps, ServiceType} from '../../../types/gatherings/createGathering.types';

import {ServiceOption} from './serviceOption';

const OPTION_LIST: {
  type: ServiceType;
  label: '달램핏' | '워케이션';
  subLabel: '오피스 스트레칭' | '마인드 풀니스' | '';
}[] = [
  {
    type: 'OFFICE_STRETCHING',
    label: '달램핏',
    subLabel: '오피스 스트레칭',
  },
  {
    type: 'MINDFULNESS',
    label: '달램핏',
    subLabel: '마인드 풀니스',
  },
  {
    type: 'WORKATION',
    label: '워케이션',
    subLabel: '',
  },
];

export function ServiceTypeSelect({value, onChange}: InputProps<ServiceType>) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">선택 서비스</label>
      <div className="flex gap-3">
        {OPTION_LIST.map(optionInfo => {
          return (
            <ServiceOption
              key={optionInfo.type}
              type={optionInfo.type}
              label={optionInfo.label}
              subLabel={optionInfo.subLabel}
              isSelected={value === optionInfo.type}
              onClick={() => onChange(optionInfo.type)}
            />
          );
        })}
      </div>
    </div>
  );
}
