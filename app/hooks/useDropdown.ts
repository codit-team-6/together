import {useState} from 'react';

import {DefaultValue, SelectedItem} from '../types/common/dropDown.types';

export type UseDropdownProps = {
  defaultValue: DefaultValue;
};

export function useDropdown({defaultValue}: UseDropdownProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(defaultValue);

  // Location 클릭
  function handleButtonClick() {
    setIsButtonClicked(prev => !prev);
  }
  function handleListClick(event: React.MouseEvent<HTMLButtonElement>) {
    const getSelectedItem = event.currentTarget.name as SelectedItem;
    setSelectedItem(getSelectedItem);
    setIsButtonClicked(false);
  }
  return {
    isButtonClicked,
    selectedItem,
    handleButtonClick,
    handleListClick,
  };
}
