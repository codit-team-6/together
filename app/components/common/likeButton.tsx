import {useEffect, useState} from 'react';

import Image from 'next/image';

export function LikeButton({gatheringId}: {gatheringId: number}) {
  const [liked, setLiked] = useState(false);

  // 로컬스토리지에서 찜한 목록을 가져와 현재 id가 포함되어 있는지 확인
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedGatherings') || '[]');
    setLiked(storedLikes.includes(gatheringId));
  }, [gatheringId]);

  function toggleLike() {
    const storedLikes = JSON.parse(localStorage.getItem('likedGatherings') || '[]');
    let updatedLikes;

    if (storedLikes.includes(gatheringId)) {
      // 이미 찜한 경우 -> 제거
      updatedLikes = storedLikes.filter((itemId: number) => itemId !== gatheringId);
      setLiked(false);
    } else {
      // 찜하지 않은 경우 -> 추가
      updatedLikes = [...storedLikes, gatheringId];
      setLiked(true);
    }

    localStorage.setItem('likedGatherings', JSON.stringify(updatedLikes));
  }

  return (
    <button type="button" className="absolute right-5 top-5" onClick={toggleLike}>
      <Image
        src={liked ? 'icons/heart.svg' : 'icons/emptyHeart.svg'}
        alt="찜 버튼"
        width={48}
        height={48}
        unoptimized
      />
    </button>
  );
}
