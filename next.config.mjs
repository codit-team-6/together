/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // URL의 프로토콜 (http 또는 https)
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com', // 허용할 도메인
        port: '', // 포트가 필요 없다면 빈 문자열
        pathname: '/**', // 특정 경로나 하위 폴더를 허용
      },
    ],
  },
  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ['jotai-devtools'],
};

export default nextConfig;
