'use client';

import {useEffect, useRef, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {PROFILE_DROPDOWN} from '../../constants/mediaQuery';
import {useUserMutation} from '../../queries/user/useUserMutaions';
import {useUserQuery} from '../../queries/user/useUserQuries';

function ProfileSection() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDropdownSpace, setHasDropdownSpace] = useState(true);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const {getMyInfo} = useUserQuery();
  const {logout} = useUserMutation();

  const {data: userInfo} = getMyInfo();
  const {mutate} = logout();

  useEffect(() => {
    if (!isOpen || !profileButtonRef.current) return undefined;

    const dropdownObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHasDropdownSpace(true);
          } else {
            setHasDropdownSpace(false);
          }
        });
      },
      {rootMargin: `0px -${PROFILE_DROPDOWN} 0px 0px `},
    );

    dropdownObserver.observe(profileButtonRef.current);

    return () => {
      dropdownObserver.disconnect();
    };
  }, [isOpen]);

  const handleDropDownClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    mutate();
    setIsOpen(false);
  };

  return (
    <div className="relative self-center">
      {userInfo ? (
        <button
          type="button"
          ref={profileButtonRef}
          onClick={handleDropDownClick}
          className="z-40 size-10"
        >
          <Image
            src="/images/profile/size=Large, state=Default.svg"
            alt="큰 로고 이미지"
            width={73}
            height={35}
            unoptimized
          />
        </button>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-6 self-center text-sm font-semibold text-white tablet:text-base"
        >
          로그인
        </Link>
      )}

      {isOpen && (
        <>
          <ul
            className={clsx(
              'absolute top-[calc(100%+6px)] z-40 w-[110px] overflow-hidden rounded-[12px] bg-gray-50 text-sm font-medium text-gray-800 desktop:w-[profileDropdown] desktop:text-base',
              {'left-0': hasDropdownSpace},
              {'right-0': !hasDropdownSpace},
            )}
          >
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <button
                type="button"
                onClick={() => {
                  handleDropDownClick();
                  router.push('/mypage');
                  router.refresh(); // Router cache로 인해 middleware가 동작하지 않게 되어, middleware가 필요한 페이지의 경우 router.refresh 사용
                }}
              >
                마이페이지
              </button>
            </li>
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
          {/* Dropdown backdrop */}
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

export default ProfileSection;
