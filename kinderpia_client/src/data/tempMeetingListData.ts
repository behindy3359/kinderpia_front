import { MettingListInfo } from '../types/meetinglist';

export const dummyMeetingList: MettingListInfo[] = [
  {
    meetingId: 1,
    meetingTitle: '에버랜드 같이 가요~!',
    meetingCategory: '오락 & 여가',
    location: '용산구',
    meetingTime: '2024-10-30 10:00',
    writer: '글쓴이',
    participants: 5, // 현재 참가 인원
    meetingStatus: '모집중',
  },
  {
    meetingId: 2,
    meetingTitle: '롯데월드 방문해요!',
    meetingCategory: '오락 & 여가',
    location: '송파구',
    meetingTime: '2024-11-02 14:00',
    writer: '여행 매니아',
    participants: 8,
    meetingStatus: '인원마감',
  },
  {
    meetingId: 3,
    meetingTitle: '서울숲 피크닉',
    meetingCategory: '자연 & 환경',
    location: '성동구',
    meetingTime: '2024-11-05 12:00',
    writer: '자연 사랑',
    participants: 6,
    meetingStatus: '모임종료',
  },
  {
    meetingId: 4,
    meetingTitle: '63빌딩 전망대 가요!',
    meetingCategory: '체험 & 활동',
    location: '영등포구',
    meetingTime: '2024-11-07 15:00',
    writer: '전망러',
    participants: 4,
    meetingStatus: '모집중',
  },
  {
    meetingId: 5,
    meetingTitle: '국립중앙박물관 탐방',
    meetingCategory: '교육 & 문화',
    location: '용산구',
    meetingTime: '2024-11-10 11:00',
    writer: '문화인',
    participants: 10,
    meetingStatus: '모집중',
  },
];
