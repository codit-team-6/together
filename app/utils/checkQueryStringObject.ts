import {match, P} from 'ts-pattern';

import {GetReviewsProps} from '../types/reviews/reviewsApi.types';

const GATHERING_TYPES = [
  'DALLAEMFIT',
  'OFFICE_STRETCHING',
  'MINDFULNESS',
  'WORKATION',
] as const satisfies [string, ...string[]];

const LOCATIONS = ['건대입구', '을지로3가', '신림', '홍대입구'] as const satisfies [
  string,
  ...string[],
];

const SORT_BY = ['createdAt', 'score', 'participantCount', 'registrationEnd'] as const satisfies [
  string,
  ...string[],
];

const SORT_ORDER = ['asc', 'desc'] as const satisfies [string, ...string[]];

export const checkQueryStringObject = (params: GetReviewsProps) => {
  const newQueryStringObject = {...params};

  const matchValue = (
    value: string | undefined,
    validValue: [string, ...string[]],
    defaultValue?: string,
  ) => {
    return match(value)
      .with(P.union(...validValue), matchedItem => matchedItem)
      .otherwise(() => defaultValue);
  };

  newQueryStringObject.type = matchValue(params.type, GATHERING_TYPES, 'DALLAEMFIT');
  newQueryStringObject.location = matchValue(params.location, LOCATIONS);
  newQueryStringObject.sortBy = matchValue(params.sortBy, SORT_BY);
  newQueryStringObject.sortOrder = matchValue(params.sortOrder, SORT_ORDER);

  return newQueryStringObject;
};
