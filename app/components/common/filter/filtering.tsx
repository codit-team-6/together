import {Dispatch, SetStateAction} from 'react';

import {
  GATHERING_SORT_LIST,
  LOCATION_LIST,
  REVIEW_SORT_LIST,
} from '../../../types/common/dropDown.types';
import {GetReviewsProps} from '../../../types/reviews/reviewsApi.types';

import {Dropdown} from './dropdown';
import DropdownCalendar from './dropdownCalendar';

export type FilterProps = {
  pageName: 'GATHERING' | 'REVIEW';
  updateQueryString: (newFilter: Partial<GetReviewsProps>) => void;
  filter: GetReviewsProps;
  setFilter: Dispatch<SetStateAction<GetReviewsProps>>;
};

export function Filtering({pageName, updateQueryString, filter, setFilter}: FilterProps) {
  return (
    <>
      {/* <div>위치: {filter?.location}</div>
      <div>정렬 기준: {filter?.sortBy}</div> */}

      <div className="flex justify-between">
        <div className="mr-2 flex gap-2">
          {/* location */}
          <Dropdown
            defaultValue="지역 전체"
            filterList={[...LOCATION_LIST]}
            updateQueryString={updateQueryString}
            filter={filter}
            setFilter={setFilter}
          />
          <DropdownCalendar
            updateQueryString={updateQueryString}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <Dropdown
          defaultValue={pageName === 'GATHERING' ? '마감 임박' : '최신 순'}
          filterList={pageName === 'GATHERING' ? [...GATHERING_SORT_LIST] : [...REVIEW_SORT_LIST]}
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </>
  );
}
