import {useEffect, useState} from 'react';

import {getJoinedGatherings} from '../apis/gatherings/gatheringApi';
import {getReviews} from '../apis/reviews/reviewsApi';
import {useUserQuery} from '../queries/user/useUserQueries';
import {ReviewListType} from '../types/common/reviews.types';
import {GetJoinedGatherings} from '../types/gatherings/joinedGatherings.types';
import {myGatheringSort} from '../utils/myGatheringSort';

export function useMyGatheringsData() {
  const [joinedGatherings, setJoinedGatherings] = useState<GetJoinedGatherings[] | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewListType['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {getMyInfo} = useUserQuery();
  const {data: userInfoResponse} = getMyInfo();
  const userInfo = userInfoResponse?.data;

  useEffect(() => {
    const fetchGatherings = async () => {
      setIsLoading(true);
      try {
        const response = await getJoinedGatherings();
        setJoinedGatherings(myGatheringSort(response));

        if (userInfo) {
          const reviewsResponse = await getReviews({userId: userInfo.id});
          setReviewsData(reviewsResponse.data);
        }

        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGatherings();
  }, [userInfo?.id]);

  return {joinedGatherings, reviewsData, isLoading, isError, userInfo};
}
