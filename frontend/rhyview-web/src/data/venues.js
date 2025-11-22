const charlotteLayout = [
  // 1열은 'STAGE'로 채워서 무대를 표시
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  // 2열은 실제 좌석과 복도(null)
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null,],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null,],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null,],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', null, 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'],
  ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', null, 'G7', 'G8', 'G9', 'G10', null, 'G11', 'G12', 'G13', 'G14', 'G15', 'G16'],
  // ... (이하 생략)
];

const sejongLayout = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null,],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null,],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null,],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
];

const sacLayout = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null,],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null,],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null,],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', null, 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'],
];

const kspoLayout = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null,],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null,],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null,],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', null, 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'],
];

const bluesquareLayout = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null,],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null,],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null,],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', null, 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'],
];

export const venues = [
  {
    id: "charlotte",
    name: "샤롯데씨어터",
    location: "서울 송파구",
    category: "뮤지컬",
    image: "https://www.charlottetheater.co.kr/images/stage/intro_img0.jpg",
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
    image: "https://www.sejongpac.or.kr/static/portal/img/content/img_space_0103_01.png",
    rating: "4.7",
    reviewCount: 512,
    shortDesc: "대형 공연장으로 연극/뮤지컬이 자주 올라옵니다.",
    seatingLayout: sejongLayout
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
    seatingLayout: sacLayout
  },
  {
    id: "kspo",
    name: "KSPO DOME",
    location: "서울 송파구",
    category: "경기장",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    rating: "4.3",
    reviewCount: 1204,
    shortDesc: "올림픽공원 안에서 규모가 가장 큰 경기장.",
    seatingLayout: kspoLayout
  },
  {
    id: "bluesquare",
    name: "블루스퀘어",
    location: "서울 용산구",
    category: "뮤지컬",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
    rating: "4.6",
    reviewCount: 645,
    shortDesc: "국내 흥행 1위 공연장.",
    seatingLayout: bluesquareLayout
  },
];