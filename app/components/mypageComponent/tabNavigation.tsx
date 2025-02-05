import {ReviewedGatheringFilter} from '../../types/common/gatheringFilter.types';

export function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: ReviewedGatheringFilter;
  setActiveTab: (tab: ReviewedGatheringFilter) => void;
}) {
  const tabOptions: {key: ReviewedGatheringFilter; label: string}[] = [
    {key: 'myGatherings', label: '나의 모임'},
    {key: 'myReviews', label: '나의 리뷰'},
    {key: 'createdGatherings', label: '내가 만든 모임'},
  ];

  return (
    <div className="ml-[24px] mt-[24px] flex h-[34px] w-[300px] gap-[12px] text-gray-400">
      {tabOptions.map(tab => (
        <button
          type="button"
          key={tab.key}
          className={`text-sm font-semibold ${
            activeTab === tab.key ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
