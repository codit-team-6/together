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
    extend: {
      screens: {
        tablet: '405px', // navbar font 깨짐 때문에 405px 기준 추가
        desktop: '1200px',
      },
      colors: COLOR_PALLETTE,
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      keyframes: {
        bounce: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-10px)'},
        },
        shake: {
          '0%, 100%': {transform: 'translateX(0)'},
          '25%': {transform: 'translateX(-5px)'},
          '75%': {transform: 'translateX(5px)'},
        },
      },
      animation: {
        bounce: 'bounce 0.6s ease-in-out infinite',
        shake: 'shake 0.2s ease-in-out 2', // 5회 반복(1초)
      },
    },
  },
  plugins: [],
};
export default config;
