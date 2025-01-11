import {pageInfoProps} from '../../types/pageInfo.types';

export function PageInfo({pageName}: pageInfoProps) {
  return (
    <div className="xs:gap-[7px] flex items-center gap-4">
      <img src={`/icons/${pageName}-page-head.svg`} alt={`${pageName} 페이지 로고`} />
      <div
        className={`flex h-[60px] gap-2 ${pageName === 'gatherings' ? 'flex-col-reverse' : 'flex-col'}`}
      >
        <h1 className="xs:text-2xl text-lg font-semibold text-gray-900">
          {pageName === 'gatherings' && '지금 모임에 참여해보세요'}
          {pageName === 'reviews' && '모든 리뷰'}
          {pageName === 'likes' && '찜한 모임'}
        </h1>
        <p className="text-sm font-medium text-gray-700">
          {pageName === 'gatherings' && '함께 할 사람이 없나요?'}
          {pageName === 'reviews' && '같이 달램을 이용한 분들은 이렇게 느꼈어요😉'}
          {pageName === 'likes' && '마감되기 전에 지금 바로 참여해보세요🤓'}
        </p>
      </div>
    </div>
  );
}
