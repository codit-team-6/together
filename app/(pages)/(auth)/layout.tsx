import Image from 'next/image';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center desktop:flex-row desktop:gap-24">
      {/* 좌측 이미지 섹션 */}
      <section className="flex w-full flex-1 items-center justify-center desktop:justify-start">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 text-center font-pretendard text-gray-800">
            <h2 className="text-2xl font-bold">Welcome to 같이달램!</h2>
            <p className="text-sm font-semibold">
              바쁜 일상 속 잠깐의 휴식,
              <br />
              이제는 같이 달램과 함께 해보세요.
            </p>
          </div>
          <div className="relative mt-4 size-64 tablet:size-80 desktop:h-[400px] desktop:w-96">
            <Image src="/images/auth.png" fill alt="Login logo" className="object-contain" />
          </div>
        </div>
      </section>

      {/* 우측 로그인/회원가입 섹션 */}
      <section className="flex w-full flex-1 items-center justify-center desktop:justify-start">
        {children}
      </section>
    </main>
  );
}

export default AuthLayout;
