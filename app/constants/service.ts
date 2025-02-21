// # API
export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// # Auth
export const TOKEN_EXPIRE_TIME = 60 * 60;

export const AUTH_TOKEN = 'auth-token';

// # Filtering
export const SERVICE_TYPES = {
  OFFICE_STRETCHING: 'OFFICE_STRETCHING',
  MINDFULNESS: 'MINDFULNESS',
  WORKATION: 'WORKATION',
} as const;

export const TYPES = ['OFFICE_STRETCHING', 'MINDFULNESS', 'WORKATION'] as const;

export const LOCATIONS = ['건대입구', '을지로3가', '신림', '홍대입구'] as const;

export const SORT_BY = ['dateTime', 'registrationEnd', 'participantCount'] as const;

// # ETC
export const MIN_PARTICIPANT_COUNT = 5;
