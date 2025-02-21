import Image from 'next/image';

import {ReviewType} from '../../types/reviews/reviews.types';

import {Hearts} from './hearts';

// 마이페이지-나의 리뷰는 pageName = "mypage"를 보내야함.
// 모임 상세 페에지는 pageName = "gatherings"을 보내야함.

export function ReviewCard({
  gatheringImg,
  score,
  comment,
  gatheringType,
  gatheringLocation,
  userImg,
  userName,
  createdAt,
  pageName,
}: ReviewType) {
  const createDate: string = createdAt.slice(0, 10).replaceAll('-', '.');

  return (
    <div
      className={`grid w-[311px] grid-rows-1 sm:w-full ${pageName === 'gatherings' ? 'sm:grid-cols-1' : 'sm:grid-cols-[280px_minmax(0,_1fr)]'} box-border gap-6`}
    >
      {pageName !== 'gatherings' &&
        (!gatheringImg ? (
          <div className="h-[156px] w-[311px] rounded-3xl bg-neutral-800 sm:w-[280px]" />
        ) : (
          <div className="relative h-[156px] w-[311px] overflow-hidden rounded-3xl sm:w-[280px]">
            <Image
              src={gatheringImg}
              alt="모임 이미지"
              fill
              sizes="(max-width: 768px) 311px, 280px"
              className="object-cover"
            />
          </div>
        ))}
      <div className="flex flex-col border-b-2 border-dashed border-gray-200 pb-5 sm:px-0">
        <Hearts score={score} />
        <p className="pt-2.5 text-sm">{comment}</p>
        {pageName === 'gatherings' ? (
          ''
        ) : (
          <div className="pt-2.5 text-sm">{`${gatheringType} · ${gatheringLocation}`}</div>
        )}
        <div className="flex items-center pt-2 text-sm">
          {pageName === 'mypage' ? (
            ''
          ) : (
            <div className="flex items-center">
              {!userImg ? (
                <Image
                  src="/icons/profile-default.svg"
                  alt="기본 프로필 이미지"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={userImg}
                  alt="프로필 이미지"
                  width={24}
                  height={24}
                  className="size-6 rounded-full"
                />
              )}
              <span className="pl-2">{userName}</span>
            </div>
          )}
          {pageName === 'mypage' ? '' : <div className="pl-2 pr-3">|</div>}
          <div className="text-gray-500">{createDate}</div>
        </div>
      </div>
    </div>
  );
}
