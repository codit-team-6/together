interface IGetGatherings {
  id: number; // 모임 ID
  type: (typeof TYPES)[number]; // 모임 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜
  registrationEnd: string; // 모임 모집 마감일
  location: (typeof LOCATIONS)[number]; // 모임 위치
  participantCount: number; // 참여 인원
  capacity: number; // 모임 정원
  image: string; // 모임 대표 이미지
  createdBy: number; // 모임 생성자 ID
  canceledAt: string; // 모임 취소일
}

interface IGetJoinedGatherings extends IGetGatherings {
  isCompleted: boolean; // 모임 완료 여부
  isReviewed: boolean; // 리뷰 작성 여부
}

interface ICreateGathering {
  location: (typeof LOCATIONS)[number];
  type: (typeof TYPES)[number];
  name: string;
  dateTime: string;
  capacity: number;
  image: string;
  registrationEnd: string;
}
