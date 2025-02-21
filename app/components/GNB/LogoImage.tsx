import Image from 'next/image';
import Link from 'next/link';

function LogoImage() {
  return (
    // srcset 속성을 이용해서 1개의 Image 컴포넌트로 관리하고자 했으나 width,height ratio 설정을 1가지로 밖에 못해서 2개로 나눠서 작성
    <Link href="/" className="self-center">
      <Image
        src="/images/logo/size=large.svg"
        alt="큰 로고 이미지"
        width={73}
        height={35}
        sizes="73px"
        className="hidden tablet:block"
      />
      <Image
        src="/images/logo/size=small.svg"
        alt="작은 로고 이미지"
        width={56}
        height={27}
        sizes="56px"
        className="block tablet:hidden"
      />
    </Link>
  );
}

export default LogoImage;
