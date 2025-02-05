import {ReviewListType} from '../../../types/common/reviews.types';
import {Review} from '../../common/review/review';

export function ReviewList({reviewsData}: {reviewsData: ReviewListType['data']}) {
  return reviewsData.map(review => (
    <Review
      key={review.id}
      gatheringImg={review.Gathering.image}
      score={review.score}
      comment={review.comment}
      gatheringType={review.Gathering.type}
      gatheringLocation={review.Gathering.location}
      userImg={review.User.image || '/icons/profile-default.svg'}
      userName={review.User.name}
      createdAt={review.createdAt}
      pageName="my-page"
    />
  ));
}
