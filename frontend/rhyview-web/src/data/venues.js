const charlotteLayout = [
  // 1열은 'STAGE'로 채워서 무대를 표시
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  // 2열은 실제 좌석과 복도(null)
  ['A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7'],
  ['B1', 'B2', 'B3', null, 'B4', 'B5', 'B6', 'B7'],
  ['C1', 'C2', 'C3', null, 'C4', 'C5', 'C6', 'C7']
  // ... (이하 생략)
];

export const venues = [
  {
    id: "charlotte",
    name: "샤롯데씨어터",
    location: "서울 송파구",
    category: "뮤지컬",
    image: "https://images.unsplash.com/photo-1527356926125-2e5fdc851644",
    rating: "4.5",
    reviewCount: 328,
    shortDesc: "뮤지컬 전용 극장으로 무대/음향 설계가 좋습니다.",
    seatingLayout: charlotteLayout
  },
  {
    id: "sejong",
    name: "세종문화회관 대극장",
    location: "서울 종로구",
    category: "연극",
    image: "https://images.unsplash.com/photo-1515165562835-c3b8c2e0b4ad",
    rating: "4.7",
    reviewCount: 512,
    shortDesc: "대형 공연장으로 연극/뮤지컬이 자주 올라옵니다.",
  },
  {
    id: "sac",
    name: "예술의전당 콘서트홀",
    location: "서울 서초구",
    category: "콘서트",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    rating: "4.8",
    reviewCount: 892,
    shortDesc: "클래식에 최적화된 음향을 자랑하는 콘서트홀입니다.",
  },
];