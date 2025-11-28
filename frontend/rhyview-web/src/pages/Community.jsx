import React, { useState } from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { Send } from "lucide-react"; // Send 아이콘 사용

const Section = styled.section`
  padding: 24px 32px 32px;
  @media (max-width: 768px) {
    padding: 20px 16px 24px;
  }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* ------------------ 공연 커뮤니티 리스트 화면용 스타일 ------------------ */

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ShowCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: #ffffff;
  padding: 20px 22px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.1s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const ShowThumb = styled.div`
  flex-shrink: 0;
  width: 140px;      /* 가로 늘림 */
  height: 200px;     /* 세로 크게 늘림 → 세로 포스터 잘 보임 */
  border-radius: 14px;
  background-color: #e5e7eb;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ShowContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ShowTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const ShowVenue = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const ShowPeriod = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

const ShowStatRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #6b7280;
`;

const BackLink = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin-bottom: 8px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* ------------------ 커뮤니티 게시판 스타일 ------------------ */

const FeedCard = styled.div`
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
  padding: 16px 18px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.1s ease;
  &:hover {
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;
const ArtistAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const ArtistName = styled.span`
  font-size: 13px;
  font-weight: 700;
`;
const ArtistMeta = styled.span`
  font-size: 11px;
  color: #9ca3af;
`;
const FeedTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin: 6px 0;
`;
const FeedBody = styled.p`
  margin: 0;
  font-size: 13px;
  color: #4b5563;
`;
const FeedFooter = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  gap: 12px;
`;

const ScheduleCard = styled.div`
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
  padding: 16px 18px;
`;
const ScheduleItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 2px;
  &:last-child {
    border-bottom: none;
  }
`;
const ScheduleTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
`;
const ScheduleMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
`;
const ScheduleTag = styled.span`
  display: inline-block;
  margin-top: 4px;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;
const CommentCard = styled.div`
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 8px 10px;
`;
const CommentMeta = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 4px;
`;
const CommentText = styled.div`
  font-size: 13px;
  color: #374151;
`;

// 댓글 입력 폼
const CommentForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;
const CommentInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 99px;
  border: 1px solid var(--line);
  font-size: 13px;
  background: #fff;
  &:focus {
    outline: 2px solid var(--brand);
    border-color: transparent;
  }
`;
const SubmitBtn = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------ 더미 데이터 ------------------ */

/** 1) 공연 커뮤니티 목록 (첫 화면 카드 리스트) */
const showCommunities = [
  {
    id: 1,
    title: "오페라의 유령",
    venue: "샤롯데씨어터",
    period: "2024.11.15 ~ 2025.02.28",
    members: "1,245",
    likes: "8,920",
    image: "/posters/opera.jpg",
  },
  {
    id: 2,
    title: "레미제라블",
    venue: "블루스퀘어",
    period: "2024.12.01 ~ 2025.03.31",
    members: "890",
    likes: "5,420",
    image: "/posters/les.jpg",
  },
  {
    id: 3,
    title: "IU 콘서트 2024",
    venue: "KSPO DOME",
    period: "2024.12.15 ~ 2024.12.20",
    members: "2,890",
    likes: "15,780",
    image: "/posters/iu.jpg",
  },
  {
    id: 4,
    title: "터치드(TOUCHED) 단독 콘서트",
    venue: "티켓링크 라이브 아레나",
    period: "2025.01.05 ~ 2025.01.06",
    members: "620",
    likes: "3,210",
    image: "/posters/touched.jpg",
  },
  {
    id: 5,
    title: "뷰티풀 라이프",
    venue: "JTN 아트홀",
    period: "2025.02.01 ~ 2025.05.31",
    members: "980",
    likes: "7,540",
    image: "/posters/beauty.jpg",
  },
  {
    id: 6,
    title: "디즈니 인 콘서트",
    venue: "세종문화회관 대극장",
    period: "2025.03.10 ~ 2025.03.12",
    members: "1,530",
    likes: "9,120",
    image: "/posters/disney.jpg",
  },
  {
    id: 7,
    title: "비틀쥬스",
    venue: "LG아트센터",
    period: "2025.04.01 ~ 2025.06.30",
    members: "2,310",
    likes: "12,480",
    image: "/posters/juice.jpeg",
  },
  {
    id: 8,
    title: "데스노트",
    venue: "디큐브 링크아트센터",
    period: "2025.05.03 ~ 2025.05.05",
    members: "4,520",
    likes: "20,310",
    image: "/posters/deathnote.jpg",
  },
];

/** 2) 공연별 아티스트/팬 피드 (공연 id 기준) */
const artistPostsByShow = {
  1: [
    {
      id: 101,
      artist: "오페라의 유령 코리아",
      role: "공식 계정",
      title: "서울 초연 리허설 현장 공개 🎭",
      time: "1시간 전",
      preview:
        "샹들리에 장면 리허설을 마쳤습니다. 실제 공연에서는 더 화려하게 보여드릴게요!",
      likes: 320,
      comments: 58,
    },
    {
      id: 102,
      artist: "팬클럽 PHANTOM",
      role: "팬클럽",
      title: "1막 커튼콜 응원법 정리",
      time: "어제",
      preview:
        "1막 마지막 넘버에서 단체 응원 구간을 정리했어요. 초연/재연 팬분들 의견 환영합니다!",
      likes: 142,
      comments: 34,
    },
    {
      id: 103,
      artist: "마스카르",
      role: "팬",
      title: "최애 캐스트 조합 추천받아요",
      time: "2일 전",
      preview:
        "초연 때는 라울이 최애였는데 이번엔 팬텀이 너무 좋아요… 여러분 픽은 누구인가요?",
      likes: 96,
      comments: 21,
    },
  ],
  2: [
    {
      id: 201,
      artist: "레미제라블 코리아",
      role: "제작사",
      title: "엑토르/앙졸라 캐스트 인터뷰 공개",
      time: "3시간 전",
      preview:
        "배우들이 말하는 ‘원샷 장면’ 비하인드와 학생혁명 장면에 대한 해석을 들어보세요.",
      likes: 210,
      comments: 41,
    },
    {
      id: 202,
      artist: "레미제 팬연합",
      role: "팬클럽",
      title: "프리뷰 회차 굿즈 교환/양도 모아보기",
      time: "5시간 전",
      preview:
        "프로그램, 엽서 세트, 콜라보 굿즈 교환 글을 한 곳에 모았습니다. 글 작성 전 규칙을 꼭 읽어주세요!",
      likes: 97,
      comments: 22,
    },
    {
      id: 203,
      artist: "엔조르라",
      role: "팬",
      title: "마이 시팅 후기를 공유해요",
      time: "어제",
      preview:
        "2층 사이드였는데 ‘원데이 모어’ 때 동선이 다 보이는 뷰라 생각보다 만족도가 높았어요.",
      likes: 81,
      comments: 18,
    },
  ],
  3: [
    {
      id: 301,
      artist: "IU",
      role: "아티스트",
      title: "세트리스트 스포 없는 힌트 🌙",
      time: "1시간 전",
      preview:
        "이번 콘서트에서는 ‘밤’과 관련된 곡들을 많이 부르게 될 것 같아요. 여러분의 밤은 어떤 색인가요?",
      likes: 890,
      comments: 230,
    },
    {
      id: 302,
      artist: "유애나 운영진",
      role: "팬클럽",
      title: "플카/슬로건 배포 좌석 안내",
      time: "어제",
      preview:
        "각 구역별 플카 배포 동선을 정리했어요. 현장 혼잡을 막기 위해 시간을 꼭 지켜주세요!",
      likes: 540,
      comments: 120,
    },
    {
      id: 303,
      artist: "밤편지",
      role: "팬",
      title: "첫 콘서트 입문자에게 추천하는 좌석",
      time: "2일 전",
      preview:
        "중앙 2층이 전체 연출 보기에는 제일 좋은 것 같아요. 지난 투어 기준 후기도 남겨요.",
      likes: 312,
      comments: 77,
    },
  ],
  4: [
    {
      id: 401,
      artist: "터치드(TOUCHED)",
      role: "밴드",
      title: "세트리스트 투표 받습니다 🎸",
      time: "4시간 전",
      preview:
        "이번 단독 콘서트에서 꼭 듣고 싶은 곡이 있다면 댓글로 남겨주세요. 최대한 반영해 볼게요!",
      likes: 260,
      comments: 63,
    },
    {
      id: 402,
      artist: "TOUCHED 팬존",
      role: "팬클럽",
      title: "공식 응원법/떼창 가이드",
      time: "어제",
      preview:
        "후렴 구간 떼창 가사를 정리해 둔 이미지입니다. 처음 오는 분들도 금방 따라 하실 수 있어요.",
      likes: 132,
      comments: 29,
    },
  ],
  5: [
    {
      id: 501,
      artist: "뷰티풀 라이프 제작진",
      role: "연극 제작사",
      title: "포스터 촬영 비하인드 공개",
      time: "2시간 전",
      preview:
        "주인공 두 사람의 ‘청춘 시절’ 사진을 더 많이 보고 싶다는 요청이 많아서, 스틸컷을 조금 더 풀어봅니다.",
      likes: 175,
      comments: 36,
    },
    {
      id: 502,
      artist: "연극덕후",
      role: "팬",
      title: "1막 울포인트 정리 (스포 약함)",
      time: "어제",
      preview:
        "크게 스포는 아니고, 눈물샘이 터질 수 있는 장면들을 대략적으로만 정리해봤어요.",
      likes: 98,
      comments: 24,
    },
  ],
  6: [
    {
      id: 601,
      artist: "서울시향",
      role: "오케스트라",
      title: "디즈니 인 콘서트 리허설 현장 공개",
      time: "30분 전",
      preview:
        "라이온킹, 겨울왕국, 알라딘 등 명곡을 오케스트라로 들을 수 있는 기회! 오늘은 ‘서클 오브 라이프’를 연습 중입니다.",
      likes: 410,
      comments: 69,
    },
    {
      id: 602,
      artist: "디즈니키드",
      role: "팬",
      title: "코스튬 드레스코드 모아보기",
      time: "1일 전",
      preview:
        "가족 단위 관객분들 위주로, 어떤 디즈니 캐릭터 복장을 하고 오는지 사진을 모아보는 글입니다 😊",
      likes: 154,
      comments: 33,
    },
  ],
  7: [
    {
      id: 701,
      artist: "비틀쥬스 코리아",
      role: "제작사",
      title: "그린/퍼플 드레스코드 데이 안내 💚💜",
      time: "5시간 전",
      preview:
        "주간 중 일부 회차는 그린/퍼플 드레스코드 데이로 진행됩니다. 참여하시면 포토월 이벤트도 있어요!",
      likes: 305,
      comments: 88,
    },
    {
      id: 702,
      artist: "샌달맨",
      role: "팬",
      title: "비틀쥬스 입문자용 캐릭터 정리",
      time: "2일 전",
      preview:
        "원작 영화를 안 보고 와도 이해할 수 있도록, 주요 인물들 관계를 최대한 노스포 기준으로 정리했습니다.",
      likes: 167,
      comments: 40,
    },
  ],
  8: [
    {
      id: 801,
      artist: "데스노트 코리아",
      role: "제작사",
      title: "라이토/엘 캐스트 인터뷰 영상 공개",
      time: "3시간 전",
      preview:
        "두 캐릭터의 심리전을 표현하기 위해 어떤 점을 신경 썼는지 이야기를 들어보았습니다.",
      likes: 520,
      comments: 110,
    },
    {
      id: 802,
      artist: "키라신봉자",
      role: "팬",
      title: "원작 팬이 보는 뮤지컬 데스노트 관전 포인트",
      time: "어제",
      preview:
        "애니와 비교했을 때 달라지는 장면들을 중심으로, 공연에서 집중해서 보면 좋은 부분을 정리했어요.",
      likes: 243,
      comments: 57,
    },
    {
      id: 803,
      artist: "엔딩수집가",
      role: "팬",
      title: "캐스트별 엔딩 넘버 느낌 비교 (노스포)",
      time: "2일 전",
      preview:
        "가창 스타일 위주로만 이야기를 적어봤어요. 취향에 맞는 캐스트 찾는 데 도움이 되었으면!",
      likes: 190,
      comments: 39,
    },
  ],
};

/** 3) 공연별 일정 정보 (오른쪽 카드에 표시) */
const scheduleByShow = {
  1: [
    {
      id: 1,
      title: "오페라의 유령",
      date: "2024.11.15 ~ 2025.02.28",
      venue: "샤롯데씨어터",
      tag: "뮤지컬",
    },
  ],
  2: [
    {
      id: 1,
      title: "레미제라블",
      date: "2024.12.01 ~ 2025.03.31",
      venue: "블루스퀘어",
      tag: "뮤지컬",
    },
  ],
  3: [
    {
      id: 1,
      title: "IU 콘서트 2024",
      date: "2024.12.15 ~ 2024.12.20",
      venue: "KSPO DOME",
      tag: "콘서트",
    },
  ],
  4: [
    {
      id: 1,
      title: "터치드(TOUCHED) 단독 콘서트",
      date: "2025.01.05 ~ 2025.01.06",
      venue: "티켓링크 라이브 아레나",
      tag: "콘서트",
    },
  ],
  5: [
    {
      id: 1,
      title: "뷰티풀 라이프",
      date: "2025.02.01 ~ 2025.05.31",
      venue: "JTN 아트홀",
      tag: "연극",
    },
  ],
  6: [
    {
      id: 1,
      title: "디즈니 인 콘서트",
      date: "2025.03.10 ~ 2025.03.12",
      venue: "세종문화회관 대극장",
      tag: "콘서트",
    },
  ],
  7: [
    {
      id: 1,
      title: "비틀쥬스",
      date: "2025.04.01 ~ 2025.06.30",
      venue: "LG아트센터",
      tag: "뮤지컬",
    },
  ],
  8: [
    {
      id: 1,
      title: "데스노트",
      date: "2025.05.03 ~ 2025.05.05",
      venue: "디큐브 링크아트센터",
      tag: "뮤지컬",
    },
  ],
};

/** 4) 초기 댓글 (post id 기준) */
const initialComments = {
  101: [
    {
      user: "마스카르",
      time: "30분 전",
      text: "샹들리에 장면 라이브로 보면 진짜 소름이에요.",
    },
    {
      user: "phantomfan",
      time: "1시간 전",
      text: "서울 초연 기다리면서 OST만 계속 듣는 중…",
    },
    {
      user: "lotteA",
      time: "어제",
      text: "캐스트 스케줄도 조만간 올라오겠죠? 너무 기대됩니다!",
    },
  ],
  102: [
    {
      user: "opera_lover",
      time: "5시간 전",
      text: "응원법 이미지로도 공유해주시면 좋겠어요 :)",
    },
    {
      user: "seatB3",
      time: "어제",
      text: "커튼콜 때 사진 촬영 가능 여부도 정리해주시면 감사해요!",
    },
  ],
  103: [
    {
      user: "maskfan",
      time: "2일 전",
      text: "저는 팬텀/크리스틴 조합 A라인이 국룰입니다.",
    },
  ],

  201: [
    {
      user: "javert",
      time: "2시간 전",
      text: "학생혁명 장면 연출이 정말 인상적이었어요.",
    },
    {
      user: "24601",
      time: "어제",
      text: "엑토르 배우님 목소리 라이브로 꼭 들어보세요.",
    },
  ],
  202: [
    {
      user: "cosette",
      time: "3시간 전",
      text: "프리뷰 프로그램 교환 원하시는 분 DM 주세요 :)",
    },
  ],
  203: [
    {
      user: "balconyview",
      time: "1일 전",
      text: "2층 사이드도 생각보다 시야가 괜찮았어요!",
    },
  ],

  301: [
    {
      user: "uaena",
      time: "5분 전",
      text: "밤 관련 곡이라니 벌써 울 준비 중…",
    },
    {
      user: "concertgoer",
      time: "20분 전",
      text: "이번에도 밴드 편곡 기대해도 되겠죠?",
    },
  ],
  302: [
    {
      user: "zoneE",
      time: "어제",
      text: "E구역 슬로건 배포 시간 한 번만 더 알려주세요!",
    },
    {
      user: "firsttimer",
      time: "어제",
      text: "첫 콘서트인데 플카 꼭 받아보고 싶어요 😊",
    },
  ],
  303: [
    {
      user: "view_hunter",
      time: "2일 전",
      text: "중앙 2층 진짜 좋았어요. 전체 연출 다 보입니다.",
    },
  ],

  401: [
    {
      user: "touchedfan",
      time: "1시간 전",
      text: "세트리스트에 새 싱글도 들어가나요? 너무 궁금해요.",
    },
    {
      user: "bandroom",
      time: "어제",
      text: "라이브에서 베이스 라인이 진짜 미쳤던 밴드죠.",
    },
  ],
  402: [
    {
      user: "jumpjump",
      time: "2일 전",
      text: "응원법 영상으로도 만들어주시면 좋겠어요!",
    },
  ],

  501: [
    {
      user: "dramateam",
      time: "2시간 전",
      text: "포스터 촬영 메이킹 너무 따뜻했어요.",
    },
    {
      user: "tearjerker",
      time: "어제",
      text: "1막만 봐도 이미 눈물이… 같이 보러 가실 분?",
    },
  ],
  502: [
    {
      user: "stageB",
      time: "3일 전",
      text: "울포인트 정리 덕분에 마음의 준비가 되었어요 😂",
    },
  ],

  601: [
    {
      user: "disneykid",
      time: "10분 전",
      text: "서클 오브 라이프 생음악이라니… 반드시 갑니다.",
    },
    {
      user: "familytrip",
      time: "어제",
      text: "아이들이 너무 좋아할 것 같아서 예매 완료했어요.",
    },
  ],
  602: [
    {
      user: "elsa",
      time: "1일 전",
      text: "엘사 드레스 입고 가도 되나요? ㅎㅎ",
    },
  ],

  701: [
    {
      user: "greenwitch",
      time: "3시간 전",
      text: "드레스코드 데이 일정 캡쳐해서 폰 배경으로 해뒀어요 💚",
    },
    {
      user: "beetlefan",
      time: "어제",
      text: "포토월 이벤트 기대 중입니다!",
    },
  ],
  702: [
    {
      user: "musical_newbie",
      time: "2일 전",
      text: "정리 덕분에 스토리 흐름이 훨씬 이해됐어요.",
    },
  ],

  801: [
    {
      user: "kira",
      time: "1시간 전",
      text: "캐스팅 라인업 진짜 역대급인 것 같아요.",
    },
    {
      user: "L_law",
      time: "어제",
      text: "엘 배우님 표정 연기 보는 재미가 있어요.",
    },
  ],
  802: [
    {
      user: "applepie",
      time: "어제",
      text: "원작 팬인데 이 글 보고 더 기대하게 됐어요.",
    },
  ],
  803: [
    {
      user: "endinghunter",
      time: "2일 전",
      text: "엔딩 넘버 비교 정리 감사합니다… 입덕이에요.",
    },
  ],
};

// 👇 user prop 사용
export default function Community({ user }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  const [allComments, setAllComments] = useState(initialComments);
  const [inputText, setInputText] = useState("");

  const comments = (selectedPost && allComments[selectedPost.id]) || [];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const newComment = {
      user: user.name,
      time: "방금 전",
      text: inputText,
    };

    setAllComments((prev) => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment],
    }));

    setInputText("");
  };

  /* ======================== 렌더링 분기 ======================== */

  // 1) 공연 선택 화면
  if (!selectedShow) {
    return (
      <>
        <PageHeader
          title="커뮤니티"
          desc="공연별 커뮤니티를 선택하세요."
        />
        <Section>
          <ShowGrid>
            {showCommunities.map((show) => (
              <ShowCard key={show.id} onClick={() => setSelectedShow(show)}>
                <ShowThumb
                  style={{ backgroundImage: `url(${show.image || ""})` }}
                />
                <ShowContent>
                  <ShowTitle>{show.title}</ShowTitle>
                  <ShowVenue>{show.venue}</ShowVenue>
                  <ShowPeriod>{show.period}</ShowPeriod>
                  <ShowStatRow>
                    <span>👥 {show.members}</span>
                    <span>❤ {show.likes}</span>
                  </ShowStatRow>
                </ShowContent>
              </ShowCard>
            ))}
          </ShowGrid>
        </Section>
      </>
    );
  }

  // 선택된 공연 데이터
  const postsForShow = artistPostsByShow[selectedShow.id] || [];
  const scheduleForShow = scheduleByShow[selectedShow.id] || [];

  // 2) 특정 공연 커뮤니티 게시판 화면
  return (
    <>
      <PageHeader
        title={selectedShow.title}
        desc={`${selectedShow.venue} · ${selectedShow.period}`}
      />
      <Section>
        <BackLink
          onClick={() => {
            setSelectedShow(null);
            setSelectedPost(null);
          }}
        >
          ← 다른 공연 커뮤니티 보기
        </BackLink>

        <Grid2>
          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                margin: "0 0 12px",
              }}
            >
              아티스트 피드
            </h3>
            {postsForShow.map((post) => (
              <FeedCard key={post.id} onClick={() => setSelectedPost(post)}>
                <FeedHeader>
                  <ArtistAvatar>{post.artist[0]}</ArtistAvatar>
                  <ArtistInfo>
                    <ArtistName>{post.artist}</ArtistName>
                    <ArtistMeta>
                      {post.role} · {post.time}
                    </ArtistMeta>
                  </ArtistInfo>
                </FeedHeader>
                <FeedTitle>{post.title}</FeedTitle>
                <FeedBody>{post.preview}</FeedBody>
                <FeedFooter>
                  <span>❤️ {post.likes}</span>
                  <span>
                    💬{" "}
                    {allComments[post.id]
                      ? allComments[post.id].length
                      : post.comments}
                  </span>
                </FeedFooter>
              </FeedCard>
            ))}
          </div>

          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                margin: "0 0 12px",
              }}
            >
              공연 일정
            </h3>
            <ScheduleCard>
              {scheduleForShow.map((item) => (
                <ScheduleItem key={item.id}>
                  <ScheduleTitle>{item.title}</ScheduleTitle>
                  <ScheduleMeta>
                    {item.date} · {item.venue}
                  </ScheduleMeta>
                  <ScheduleTag>{item.tag}</ScheduleTag>
                </ScheduleItem>
              ))}
            </ScheduleCard>
          </div>
        </Grid2>
      </Section>

      <Modal
        open={!!selectedPost}
        title={selectedPost?.title || ""}
        onClose={() => setSelectedPost(null)}
      >
        {selectedPost && (
          <>
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              {selectedPost.artist} · {selectedPost.role} ·{" "}
              {selectedPost.time}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#4b5563",
                marginBottom: 12,
                whiteSpace: "pre-line",
              }}
            >
              {selectedPost.preview}
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              팬 댓글
            </div>

            <CommentList>
              {comments.length === 0 ? (
                <div
                  style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    padding: "10px 0",
                  }}
                >
                  아직 댓글이 없습니다.
                </div>
              ) : (
                comments.map((c, i) => (
                  <CommentCard key={i}>
                    <CommentMeta>
                      {c.user} · {c.time}
                    </CommentMeta>
                    <CommentText>{c.text}</CommentText>
                  </CommentCard>
                ))
              )}
            </CommentList>

            <CommentForm onSubmit={handleAddComment}>
              <CommentInput
                placeholder={
                  user
                    ? "댓글을 남겨보세요..."
                    : "로그인 후 댓글을 남길 수 있습니다."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!user}
              />
              <SubmitBtn type="submit">
                <Send size={16} />
              </SubmitBtn>
            </CommentForm>
          </>
        )}
      </Modal>
    </>
  );
}
