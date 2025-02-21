export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
] as const;

// KB : 1024 byte
// MB : 1024 KB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
