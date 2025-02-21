import {getGatheringReviewsInServer} from '../../apis/reviewsApi';
import {PageInfo} from '../../components/common/pageInfo';
import ReviewWrapper from '../../components/reviews/reviewWrapper';
import {ReviewListType} from '../../types/reviews/reviews.types';

type ReviewsPageProps = {
  searchParams: {gatheringId?: string};
};

export default async function ReviewsPage({searchParams}: ReviewsPageProps) {
  const gatheringId = searchParams?.gatheringId ? Number(searchParams.gatheringId) : undefined;

  const initialReviews: ReviewListType = await getGatheringReviewsInServer({
    gatheringId,
    sortOrder: 'desc',
    limit: 10,
    offset: 0,
  });

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="reviews" />
      </div>
      <ReviewWrapper initialData={initialReviews} />
    </div>
  );
}
