type QueryParams = Record<string, string | number>;

export const buildQueryParams = (params: QueryParams): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value.toString());
    } else {
      queryParams.delete(key);
    }
  });

  return queryParams.toString();
};
