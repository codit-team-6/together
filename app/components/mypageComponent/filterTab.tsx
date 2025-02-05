import {ReviewedGatheringFilter} from '../../types/common/gatheringFilter.types';

export function FilterTab({
  activeTab,
  reviewed,
  setReviewed,
}: {
  activeTab: ReviewedGatheringFilter;
  reviewed: boolean;
  setReviewed: (value: boolean) => void;
}) {
  if (activeTab !== 'myReviews') {
    return null;
  }

  return (
    <div className="ml-[24px] mt-[16px] flex h-[40px] w-[228px] gap-[8px]">
      <button
        type="button"
        className={`h-[40px] w-[124px] rounded-xl text-xs font-medium ${
          !reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
        }`}
        onClick={() => setReviewed(false)}
      >
        작성 가능한 리뷰
      </button>
      <button
        type="button"
        className={`h-[40px] w-[96px] rounded-xl text-xs font-medium ${
          reviewed ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
        }`}
        onClick={() => setReviewed(true)}
      >
        작성한 리뷰
      </button>
    </div>
  );
}
