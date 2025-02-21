import {useEffect, useState} from 'react';

import {usePathname} from 'next/navigation';
import {match} from 'ts-pattern';

import {PageName, ReviewListType} from '../../types/reviews/reviews.types';

import {ReviewCard} from './reviewCard';

export default function ReviewCardList({data}: ReviewListType) {
  const pathName = usePathname();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const name = match(pathName)
      .when(
        p => p.startsWith('/gatherings'),
        () => 'gatherings',
      )
      .when(
        p => p.startsWith('/reviews'),
        () => 'reviews',
      )
      .when(
        p => p.startsWith('/mypage'),
        () => 'mypage',
      )
      .otherwise(() => 'unknown');

    setPageName(name);
  }, [pathName]);

  return (
    <div className="flex flex-col items-center gap-6">
      {data.map(review => (
        <ReviewCard
          key={review.id}
          gatheringImg={review.Gathering.image}
          score={review.score}
          comment={review.comment}
          gatheringType={review.Gathering.type}
          gatheringLocation={review.Gathering.location}
          userImg={review.User.image}
          userName={review.User.name}
          createdAt={review.createdAt}
          pageName={pageName as PageName}
        />
      ))}
    </div>
  );
}
