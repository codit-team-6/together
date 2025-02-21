import localFont from 'next/font/local';

// 폰트 적용
export const pretendardSubset = localFont({
  src: [
    {
      path: '../fonts/pretendard-subset/Pretendard-Black.subset.woff2',
      style: 'normal',
      weight: '900',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-ExtraBold.subset.woff2',
      style: 'normal',
      weight: '800',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-Bold.subset.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-SemiBold.subset.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-Medium.subset.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-Regular.subset.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-Light.subset.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-ExtraLight.subset.woff2',
      style: 'normal',
      weight: '200',
    },
    {
      path: '../fonts/pretendard-subset/Pretendard-Thin.subset.woff2',
      style: 'normal',
      weight: '100',
    },
  ],
  variable: '--font-pretendard',
});
