// 'info'와 같이 callback 함수로 작성하면 매개변수를 받아 매개변수에 맞는 queryKey를 생성할 수 있다.
export const userQueryKey = {
  all: ['user'] as const,
  myInfo: () => [...userQueryKey.all, 'info'] as const,
};
