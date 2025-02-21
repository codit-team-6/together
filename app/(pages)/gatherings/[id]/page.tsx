import {getGatheringReviewsInServer} from '../../../apis/reviewsApi';
import DetailPageWrapper from '../../../components/gatherings/detail/detailPageWrapper';

type GatheringPageProps = {
  params: {id: string};
};

export default async function GatheringPage({params}: GatheringPageProps) {
  const gatheringId = Number(params.id);
  const initialReviews = await getGatheringReviewsInServer({
    gatheringId,
    sortOrder: 'desc',
    limit: 10,
    offset: 0,
  });

  return <DetailPageWrapper initialReviews={initialReviews} gatheringId={gatheringId} />;
}
