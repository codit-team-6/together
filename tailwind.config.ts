import type {Config} from 'tailwindcss';

// 사용자 추가 색상 팔레트
const COLOR_PALLETTE = {
  // ...
  // 협의 후 추가로 사용되기로 한 색상들을 여기에 추가해서 사용합니다.
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
    },
    extend: {
      colors: COLOR_PALLETTE,
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
};
export default config;
